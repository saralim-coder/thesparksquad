import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Upload, FileText, Camera, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import step1Screenshot from "@/assets/step1-screenshot.png";

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

  const results = [
    { label: "Names Extracted", value: "3" },
    { label: "NRICs Captured", value: "2" },
    { label: "Contributions Recorded", value: "3" },
    { label: "Processing Time", value: "2.3s" }
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

                    {/* Steps */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">How it works:</h3>
                      {scenario.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3 group">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <span className="text-sm font-bold text-primary">{index + 1}</span>
                          </div>
                          <p className="text-muted-foreground pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Results Card */}
                  <Card className="p-8 bg-[image:var(--gradient-card)] shadow-[var(--shadow-medium)]">
                    <h3 className="text-xl font-bold mb-6 text-center">Typical Results</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {results.map((result, index) => (
                        <div 
                          key={index} 
                          className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="text-3xl font-bold text-primary mb-2">{result.value}</div>
                          <div className="text-sm text-muted-foreground">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
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
