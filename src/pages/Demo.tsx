import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Upload, FileText, Camera, CheckCircle2, Database, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import step1Screenshot from "@/assets/step1-screenshot.png";
import step3Plumber from "@/assets/step3-plumber.png";
import step3Gather from "@/assets/step3-gather.png";

const Demo = () => {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState("text");

  const demoScenarios = [
    {
      id: "text",
      title: "Text Input Demo",
      icon: FileText,
      description: "See how the platform extracts data from typed meeting notes",
      example: `Attended:
Sara Chen, Volunteer Coordinator, S1234567A - Helped set up food distribution area
John Tan, Event Lead, T9876543B - Organized 25 volunteers for the community clean-up, collected 150kg of recyclables
Mike Wong - Community Outreach - Led senior citizens tech literacy session with 15 participants`,
      steps: [
        "Paste or type your meeting notes",
        "AI analyzes and structures the data",
        "Review extracted names, NRICs, and contributions",
        "Send to GatherSG with one click"
      ]
    },
    {
      id: "image",
      title: "Image Upload Demo",
      icon: Camera,
      description: "Upload photos of handwritten notes or WhatsApp screenshots",
      steps: [
        "Take a photo of meeting notes or attendance sheet",
        "Upload the image to the platform",
        "AI performs OCR and extracts data",
        "Edit and confirm the extracted information",
        "Sync to GatherSG automatically"
      ]
    },
    {
      id: "excel",
      title: "Excel/PDF Demo",
      icon: Upload,
      description: "Import existing Excel files or PDF documents",
      steps: [
        "Upload your Excel spreadsheet or PDF",
        "Platform reads and processes the file",
        "Data is automatically mapped to correct fields",
        "Verify and make any necessary adjustments",
        "Push to GatherSG seamlessly"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            See It In Action
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Watch how our platform transforms meeting notes into structured data
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
              {demoScenarios.map((scenario) => {
                const Icon = scenario.icon;
                return (
                  <TabsTrigger key={scenario.id} value={scenario.id} className="gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{scenario.title.split(" ")[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {demoScenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <TabsContent key={scenario.id} value={scenario.id} className="space-y-8">
                  {/* Scenario Description */}
                  <Card className="p-8 bg-[image:var(--gradient-card)] shadow-[var(--shadow-medium)]">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{scenario.title}</h2>
                        <p className="text-muted-foreground">{scenario.description}</p>
                      </div>
                    </div>

                    {/* Example Input (for text demo) */}
                    {scenario.example && (
                      <div className="bg-muted/50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold mb-2 text-sm">Example Input:</h3>
                        <pre className="text-sm font-mono whitespace-pre-wrap text-muted-foreground">
                          {scenario.example}
                        </pre>
                      </div>
                    )}

                    {/* Screenshot */}
                    {scenario.id === "text" && (
                      <div className="mb-6">
                        <img 
                          src={step1Screenshot} 
                          alt="Platform interface showing input form" 
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                  </Card>

                  {/* How It Works Steps */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          1
                        </div>
                        <h3 className="text-xl font-bold">Input Made Simple</h3>
                      </div>
                      {scenario.id === "text" && (
                        <div className="mb-4">
                          <img 
                            src={step1Screenshot} 
                            alt="Input interface showing event name, meeting notes, and upload options" 
                            className="w-full rounded-lg shadow-md"
                          />
                        </div>
                      )}
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Type or paste meeting notes directly into our platform</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Upload images of handwritten notes or documents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Our system intelligently extracts and organises key information</span>
                        </li>
                      </ul>
                    </Card>

                    <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          2
                        </div>
                        <h3 className="text-xl font-bold">Automatic Organisation</h3>
                      </div>
                      <p className="text-muted-foreground mb-3">Your volunteer data is instantly structured into clear, actionable categories:</p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Database className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Event Name</strong> – Track which activities volunteers participated in</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Users className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Name & Designation</strong> – Maintain accurate volunteer records</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <TrendingUp className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Skills & Evidence</strong> – Document contributions and measure success</span>
                        </li>
                      </ul>
                    </Card>

                    <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          3
                        </div>
                        <h3 className="text-xl font-bold">Seamless Integration</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Once organised, volunteer information is automatically sent to your Gather case management system through Plumber webhooks for comprehensive tracking and follow-up.
                      </p>
                      <img 
                        src={step3Plumber} 
                        alt="Plumber webhook configuration showing successful data transmission" 
                        className="w-full rounded-lg shadow-md"
                      />
                    </Card>

                    <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          4
                        </div>
                        <h3 className="text-xl font-bold">Instant Profile Access</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Staff can easily search and filter the complete history of any volunteer by simply entering their NRIC. Access their customer profile to view their entire journey, contributions, and engagement patterns at a glance.
                      </p>
                      <img 
                        src={step3Gather} 
                        alt="Gather case management system displaying complete volunteer profile and history" 
                        className="w-full rounded-lg shadow-md"
                      />
                    </Card>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Try It Yourself?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Experience the power of automated volunteer data management
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/tools')}
            className="text-lg px-8 py-6 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] hover-scale transition-all duration-300"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Your Demo
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Demo;
