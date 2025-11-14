import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle2, Database, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();

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

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="space-y-8">
            <Card className="p-8 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold">Input Made Simple</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
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

            <Card className="p-8 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold">Automatic Organisation</h3>
              </div>
              <p className="text-muted-foreground mb-4">Your volunteer data is instantly structured into clear, actionable categories:</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Database className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
                  <span><strong>Event Name</strong> – Track which activities volunteers participated in</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
                  <span><strong>Name & Designation</strong> – Maintain accurate volunteer records</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
                  <span><strong>Skills & Evidence</strong> – Document contributions and measure success</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold">Seamless Integration</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Once organised, volunteer information is automatically sent to your Gather case management system through Plumber webhooks for comprehensive tracking and follow-up.
              </p>
            </Card>

            <Card className="p-8 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  4
                </div>
                <h3 className="text-2xl font-bold">Instant Profile Access</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Staff can easily search and filter the complete history of any volunteer by simply entering their NRIC. Access their customer profile to view their entire journey, contributions, and engagement patterns at a glance.
              </p>
            </Card>
          </div>
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
