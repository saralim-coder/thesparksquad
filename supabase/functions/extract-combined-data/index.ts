const LOVABLE_AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Competency {
  skill: string;
  proficiency: string;
  evidence: string;
  impact: string;
}

interface ExtractedPerson {
  name: string;
  designation: string;
  email?: string;
  competencies: Competency[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { meetingNotes, eventName, imageData } = await req.json();

    if (!eventName || (!meetingNotes && !imageData)) {
      throw new Error("Missing required fields");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemContent = `You are an AI that extracts attendance and competencies from meeting notes or images. 

EXTRACTION RULES:
1. Extract ONLY people who ATTENDED (ignore those marked as "not attended", "absent", or similar)
2. For each attendee, extract:
   - name (required): The person's name
   - designation (optional): Their role/title if mentioned
   - email (optional): Their email if mentioned
   - accomplishments: Any work they did or contributions mentioned

3. Be flexible with formatting:
   - Names may be just first name or full name
   - Designation might be after comma, dash, parentheses, or on separate line
   - Accomplishments can be brief notes like "help move chairs" or detailed descriptions
   - Email might be explicitly stated or not present at all

4. For competencies analysis:
   - Only create competencies if there are accomplishments mentioned
   - skill: The specific competency or skill demonstrated
   - proficiency: Level based on context (Beginner, Intermediate, Advanced, Expert)
   - evidence: What they did that demonstrates this skill
   - impact: The result or outcome (can be general if not specified)

5. Handle missing data gracefully:
   - If designation not found, use empty string
   - If email not found, use empty string
   - If no accomplishments, return empty competencies array

EXAMPLES:
"Sara, help move chairs" → name: "Sara", designation: "", accomplishments: "help move chairs", competency: Event Coordination/Beginner

Return JSON in this exact structure:
{
  "extractedData": [
    {
      "name": "string",
      "designation": "string (empty if not found)",
      "email": "string (empty if not found)",
      "competencies": [
        {
          "skill": "string",
          "proficiency": "Beginner|Intermediate|Advanced|Expert",
          "evidence": "string",
          "impact": "string"
        }
      ]
    }
  ]
}`;

    let messages;
    if (imageData) {
      messages = [
        { role: "system", content: systemContent },
        { 
          role: "user", 
          content: [
            { type: "text", text: `Event: ${eventName}\n\nPlease extract attendance and competency information from this image:` },
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
        model: "google/gemini-2.5-flash",
        messages,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      
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
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const result = await response.json();
    const extractedData = JSON.parse(result.choices[0].message.content);

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
