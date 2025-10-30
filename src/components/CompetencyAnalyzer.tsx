import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Competency {
  skill: string;
  proficiency: string;
  evidence: string;
  impact: string;
}

const CompetencyAnalyzer = () => {
  const [accomplishments, setAccomplishments] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!accomplishments.trim()) {
      toast({
        title: "Accomplishments required",
        description: "Please describe the accomplishments to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-competencies", {
        body: { accomplishments },
      });

      if (error) {
        if (error.message.includes("429")) {
          toast({
            title: "Rate limit exceeded",
            description: "Please try again in a few moments",
            variant: "destructive",
          });
        } else if (error.message.includes("402")) {
          toast({
            title: "Credits required",
            description: "Please add credits to your workspace",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      setCompetencies(data.competencies);
      toast({
        title: "Analysis complete!",
        description: `Identified ${data.competencies.length} key competencies`,
      });
    } catch (error) {
      console.error("Error analyzing competencies:", error);
      toast({
        title: "Analysis failed",
        description: "Unable to analyze competencies. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exampleText = `I led a team of 5 developers to build a React-based web application that improved user engagement by 40%. I implemented CI/CD pipelines, conducted code reviews, and mentored junior developers. Additionally, I organized weekly community outreach events that brought together over 200 volunteers, coordinated logistics for multiple projects, and developed training materials for new volunteers.`;

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Expert":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "Advanced":
        return "bg-primary/20 text-primary border-primary/30";
      case "Intermediate":
        return "bg-accent/20 text-accent border-accent/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="accomplishments">📝 Describe Your Accomplishments</Label>
          <Textarea
            id="accomplishments"
            placeholder={exampleText}
            value={accomplishments}
            onChange={(e) => setAccomplishments(e.target.value)}
            rows={8}
          />
          <p className="text-sm text-muted-foreground">
            Example: I led a team of 5 developers to build a React-based web application that improved user engagement by 40%. 
            I implemented CI/CD pipelines, conducted code reviews, and mentored junior developers...
          </p>
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Competencies...
            </>
          ) : (
            <>
              ✨ Analyze Competencies
            </>
          )}
        </Button>
      </div>

      {competencies.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Identified Competencies</h3>
            <span className="text-sm text-muted-foreground">
              {competencies.length} skills found
            </span>
          </div>
          <div className="grid gap-4">
            {competencies.map((competency, index) => (
              <Card key={index} className="p-4 space-y-3 hover:shadow-[var(--shadow-medium)] transition-all">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-lg font-semibold text-foreground flex-1">
                    {competency.skill}
                  </h4>
                  <Badge className={getProficiencyColor(competency.proficiency)}>
                    {competency.proficiency}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Evidence: </span>
                    <span className="text-muted-foreground">{competency.evidence}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Impact: </span>
                    <span className="text-muted-foreground">{competency.impact}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetencyAnalyzer;
