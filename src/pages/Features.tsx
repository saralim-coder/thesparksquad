import { Card } from "@/components/ui/card";
import { Zap, Database, Lock, Cloud, Workflow, BarChart3, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Extraction",
      description: "AI-powered data extraction processes meeting notes, photos, PDFs, and Excel files in seconds. No more manual data entry.",
      benefits: ["Works with any format", "95%+ accuracy", "Handles handwriting"]
    },
    {
      icon: Database,
      title: "Centralized Data Hub",
      description: "All volunteer participation data in one place. No more scattered Excel files or lost information across different COs.",
      benefits: ["Single source of truth", "Easy handovers", "Historical tracking"]
    },
    {
      icon: Workflow,
      title: "GatherSG Integration",
      description: "Seamless integration with GatherSG through Plumber webhooks. Data flows automatically to your case management system.",
      benefits: ["One-click sync", "Real-time updates", "No manual transfers"]
    },
    {
      icon: FileText,
      title: "Multi-Format Support",
      description: "Upload WhatsApp screenshots, photos, typed notes, PDFs, or Excel files. The platform handles them all intelligently.",
      benefits: ["Images & documents", "Flexible input", "OCR enabled"]
    },
    {
      icon: Cloud,
      title: "Cloud-Based & Accessible",
      description: "Access from anywhere, anytime. Perfect for ground officers on the move. No installation required.",
      benefits: ["Web-based", "Mobile friendly", "Always up-to-date"]
    },
    {
      icon: Lock,
      title: "Secure & Compliant",
      description: "Built with security in mind. NRIC validation, secure data handling, and proper access controls.",
      benefits: ["Data encryption", "NRIC validation", "Access control"]
    },
    {
      icon: BarChart3,
      title: "Insights & Analytics",
      description: "Track volunteer participation patterns, identify consistent contributors, and spot re-engagement opportunities.",
      benefits: ["Participation trends", "Contributor insights", "Engagement metrics"]
    },
    {
      icon: CheckCircle2,
      title: "Plug-and-Play Simplicity",
      description: "Works across all committees and COs without complex setup. Non-disruptive to existing workflows.",
      benefits: ["No training needed", "Instant setup", "Works with existing tools"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Powerful Features
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Everything you need to manage volunteer participation effectively
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience These Features?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start using the platform today and transform how you manage volunteer participation
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/tools')}
            className="text-lg px-8 py-6 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] hover-scale transition-all duration-300"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Features;
