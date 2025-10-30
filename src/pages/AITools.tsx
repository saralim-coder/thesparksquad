import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExtractedData {
  name: string;
  designation: string;
  email?: string;
  competencies: Array<{
    skill: string;
    proficiency: string;
    evidence: string;
    impact: string;
  }>;
}

const AITools = () => {
  const [eventName, setEventName] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData[]>([]);
  const { toast } = useToast();

  const handleExtract = async () => {
    if (!eventName.trim()) {
      toast({
        title: "Event name required",
        description: "Please enter an event or meeting name",
        variant: "destructive",
      });
      return;
    }

    if (!meetingNotes.trim()) {
      toast({
        title: "Meeting notes required",
        description: "Please paste your meeting notes",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("extract-combined-data", {
        body: { meetingNotes, eventName },
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

      setExtractedData(data.extractedData);
      toast({
        title: "Extraction complete!",
        description: `Found ${data.extractedData.length} attendees with competencies`,
      });
    } catch (error) {
      console.error("Error extracting data:", error);
      toast({
        title: "Extraction failed",
        description: "Unable to extract data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (index: number, email: string) => {
    const updated = [...extractedData];
    updated[index].email = email;
    setExtractedData(updated);
  };

  const sendWebhook = async (data: ExtractedData | ExtractedData[]) => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Webhook URL required",
        description: "Please enter your webhook URL",
        variant: "destructive",
      });
      return;
    }

    // Validate emails
    const dataArray = Array.isArray(data) ? data : [data];
    const missingEmails = dataArray.filter(person => !person.email?.trim());
    
    if (missingEmails.length > 0) {
      toast({
        title: "Email required",
        description: `Please enter email addresses for all attendees before sending to case system`,
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventName, data }),
      });

      if (!response.ok) throw new Error("Webhook failed");

      toast({
        title: "Webhook sent!",
        description: "Data has been sent to your case system",
      });
    } catch (error) {
      console.error("Webhook error:", error);
      toast({
        title: "Webhook failed",
        description: "Unable to send data to webhook",
        variant: "destructive",
      });
    }
  };

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

  const exampleNotes = `Attended:
Sara, help move chairs
John, IT - Led database migration project, improved query performance by 60%
Sarah Johnson, Senior Developer - Architected new microservices, mentored 3 junior devs
Mike Chen - QA Lead - Implemented automated testing framework
Emily Davis (Client Success) emily@email.com - Coordinated 15 client onboardings

Not attended:
Sharon, Finance
Tom Brown, Marketing Manager`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Platform</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Empower Your Community
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            One Volunteer at a Time
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Extract attendance and competencies from meeting notes, then send directly to your case system
          </p>
        </div>

        <Card className="max-w-6xl mx-auto p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-medium)]">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">🎯 Event or Meeting Name</Label>
                <Input
                  id="eventName"
                  placeholder="e.g., Monthly Volunteer Meeting"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingNotes">📝 Paste Meeting Notes (Attendance & Accomplishments)</Label>
                <Textarea
                  id="meetingNotes"
                  placeholder={exampleNotes}
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  rows={12}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  AI will extract names, designations (if available), emails (if available), and competencies from accomplishments. Format is flexible - simple notes like "Sara, help move chairs" work too.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">🔗 Webhook URL (Your Case System)</Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://your-case-system.com/webhook"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
              </div>

              <Button
                onClick={handleExtract}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Extracting Data...
                  </>
                ) : (
                  <>
                    🚀 Extract Attendance & Competencies
                  </>
                )}
              </Button>
            </div>

            {extractedData.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Extracted Data</h3>
                  <Button
                    onClick={() => sendWebhook(extractedData)}
                    variant="secondary"
                  >
                    Send All to Webhook
                  </Button>
                </div>
                <div className="space-y-6">
                  {extractedData.map((person, index) => (
                    <Card key={index} className="p-4 space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-16">No.</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Designation</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead className="text-center w-32">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">{index + 1}</TableCell>
                              <TableCell>{person.name}</TableCell>
                              <TableCell>{person.designation}</TableCell>
                              <TableCell>
                                <Input
                                  placeholder="Enter email"
                                  value={person.email || ""}
                                  onChange={(e) => handleEmailChange(index, e.target.value)}
                                  className="max-w-xs"
                                />
                              </TableCell>
                              <TableCell className="text-center">
                                <Button
                                  size="sm"
                                  onClick={() => sendWebhook(person)}
                                  variant="outline"
                                >
                                  Send Row
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      {person.competencies.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-muted-foreground">Competencies:</h4>
                          <div className="grid gap-3">
                            {person.competencies.map((comp, compIndex) => (
                              <div key={compIndex} className="p-3 rounded-lg bg-muted/50 space-y-2">
                                <div className="flex items-start justify-between gap-4">
                                  <span className="font-semibold text-sm">{comp.skill}</span>
                                  <Badge className={getProficiencyColor(comp.proficiency)}>
                                    {comp.proficiency}
                                  </Badge>
                                </div>
                                <div className="space-y-1 text-xs">
                                  <div>
                                    <span className="font-medium">Evidence: </span>
                                    <span className="text-muted-foreground">{comp.evidence}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Impact: </span>
                                    <span className="text-muted-foreground">{comp.impact}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AITools;
