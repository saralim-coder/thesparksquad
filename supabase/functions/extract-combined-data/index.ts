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
    const { meetingNotes, eventName } = await req.json();

    if (!meetingNotes || !eventName) {
      throw new Error("Missing required fields");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const response = await fetch(`${LOVABLE_AI_GATEWAY_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an AI that extracts attendance and competencies from meeting notes. 
Extract ONLY people who ATTENDED (ignore those marked as "not attended" or absent).
For each attendee, identify their name, designation, and analyze any accomplishments mentioned to determine their competencies.

For competencies:
- skill: The specific competency or skill demonstrated
- proficiency: Level (Beginner, Intermediate, Advanced, Expert)
- evidence: What they did that demonstrates this skill
- impact: The measurable result or outcome

Return a JSON array of objects with this structure:
{
  "extractedData": [
    {
      "name": "string",
      "designation": "string",
      "email": "string or empty if not found",
      "competencies": [
        {
          "skill": "string",
          "proficiency": "string",
          "evidence": "string",
          "impact": "string"
        }
      ]
    }
  ]
}

If no accomplishments are mentioned for a person, return an empty competencies array.`,
          },
          {
            role: "user",
            content: `Event: ${eventName}\n\nMeeting Notes:\n${meetingNotes}`,
          },
        ],
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
