import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { accomplishments } = await req.json();
    console.log("Analyzing competencies from accomplishments");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a competency analysis expert. Analyze the provided accomplishments and extract key competencies.
    
Rules:
1. Identify 5-10 key competencies demonstrated in the accomplishments
2. For each competency, provide:
   - Skill name (e.g., "Leadership", "Technical Development", "Project Management")
   - Proficiency level: Beginner, Intermediate, Advanced, or Expert
   - Evidence: A brief quote or reference from the accomplishments that demonstrates this skill
   - Impact: How this competency contributed to success
3. Be specific and evidence-based
4. Focus on transferable skills and concrete achievements`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze competencies from these accomplishments:\n\n${accomplishments}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_competencies",
              description: "Extract and analyze competencies from accomplishment descriptions",
              parameters: {
                type: "object",
                properties: {
                  competencies: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        skill: { type: "string" },
                        proficiency: { 
                          type: "string",
                          enum: ["Beginner", "Intermediate", "Advanced", "Expert"]
                        },
                        evidence: { type: "string" },
                        impact: { type: "string" },
                      },
                      required: ["skill", "proficiency", "evidence", "impact"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["competencies"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_competencies" } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to process request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("AI response received");

    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No tool call in response");
    }

    const result = JSON.parse(toolCall.function.arguments);
    console.log("Extracted competencies:", result.competencies.length);

    return new Response(
      JSON.stringify({ competencies: result.competencies }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-competencies:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
