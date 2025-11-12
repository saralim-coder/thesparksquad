const LOVABLE_AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Contribution {
  highlight: string;
}

interface ExtractedPerson {
  name: string;
  designation: string;
  nric?: string;
  contributions: Contribution[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { meetingNotes, eventName, imageData, fileType } = await req.json();

    if (!eventName || (!meetingNotes && !imageData)) {
      throw new Error("Missing required fields");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemContent = `You are an AI that extracts attendance and contributions from meeting notes, images, PDF documents, or Excel spreadsheets. 

CRITICAL RULES - READ CAREFULLY:
1. Extract ONLY people who ATTENDED (ignore those marked as "not attended", "absent", or similar)
2. For each attendee, extract:
   - name (required): The person's name
   - designation (optional): Their role/title if mentioned
   - nric (optional): Their Singapore NRIC if mentioned (format: S1234567A)
   - contributions: Key highlights of what they did

3. Be flexible with formatting:
   - Names may be just first name or full name
   - Designation might be after comma, dash, parentheses, or on separate line
   - NRIC might be explicitly stated or not present at all
   - For PDFs and Excel files: Look for tabular data, lists, or structured information

4. STRICT CONTRIBUTIONS EXTRACTION RULES:
   - **ONLY** create contributions if there are EXPLICIT accomplishments or work mentioned
   - **DO NOT** infer, assume, or generate contributions based on job titles or roles
   - **DO NOT** make up or imagine what someone might have done
   - If someone's name is mentioned but NO specific accomplishments or work is described, return EMPTY contributions array
   - highlight: A brief, concise key highlight (1-2 sentences max) of what was accomplished
   - Focus ONLY on the essential action or achievement - no elaboration on skills or impact
   - Be specific and evidence-based - only include what is explicitly stated

5. Handle missing data gracefully:
   - If designation not found, use empty string
   - If nric not found, use empty string
   - If no accomplishments mentioned, return empty contributions array

6. FILE-SPECIFIC HANDLING:
   - For Excel/spreadsheet files: Look for columns like "Name", "Role", "NRIC", "Contributions", "Highlights"
   - For PDF documents: Scan through text and tables systematically
   - For images: Use OCR capabilities to read handwritten or typed text

EXAMPLES:
✅ CORRECT: "Sara, help move chairs" → name: "Sara", designation: "", contributions: [{"highlight": "Helped move chairs for event setup"}]

✅ CORRECT: "John Tan, Event Lead" → name: "John Tan", designation: "Event Lead", contributions: [] (empty because no accomplishments mentioned)

❌ WRONG: "John Tan, Event Lead" → DO NOT create contributions like "Led the event" without explicit evidence

Return JSON in this exact structure:
{
  "extractedData": [
    {
      "name": "string",
      "designation": "string (empty if not found)",
      "nric": "string (empty if not found)",
      "contributions": [
        {
          "highlight": "string (brief 1-2 sentence key highlight, ONLY if explicitly justified)"
        }
      ]
    }
  ]
}`;

    let messages;
    if (imageData) {
      // Validate image data format
      if (!imageData.startsWith('data:')) {
        console.error("Invalid image data format - must be a data URL");
        return new Response(
          JSON.stringify({ error: "Invalid file format. Please ensure the file is properly encoded." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      console.log(`Processing ${fileType || 'file'} with data URL of length: ${imageData.length}`);
      
      const fileTypeText = fileType || "image or document";
      messages = [
        { role: "system", content: systemContent },
        { 
          role: "user", 
          content: [
            { type: "text", text: `Event: ${eventName}\n\nPlease extract volunteer attendance and contribution information from this ${fileTypeText}. Look for:
- Names of attendees
- Their roles or designations (if mentioned)
- NRIC numbers (if present)
- Specific accomplishments or contributions they made
- Any tables, lists, or structured data

Extract ONLY the information that is explicitly stated in the document.` },
            { type: "image_url", image_url: { url: imageData } }
          ]
        }
      ];
    } else {
      messages = [
        { role: "system", content: systemContent },
        { role: "user", content: `Event: ${eventName}\n\nMeeting Notes:\n${meetingNotes}` }
      ];
    }

    const response = await fetch(`${LOVABLE_AI_GATEWAY_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error response:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a few moments." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Credits required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 400) {
        // Handle bad request errors from image processing
        return new Response(
          JSON.stringify({ error: "Unable to process this file. Please ensure it's a valid image, PDF, or Excel file with readable content." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("AI response received, processing content...");
    
    let content = result.choices[0].message.content;
    
    // Strip markdown code blocks if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let extractedData;
    try {
      extractedData = JSON.parse(content);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content.substring(0, 200));
      throw new Error("Invalid response format from AI");
    }

    console.log(`Successfully extracted ${extractedData.extractedData?.length || 0} attendees`);
    
    return new Response(JSON.stringify(extractedData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in extract-combined-data function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
