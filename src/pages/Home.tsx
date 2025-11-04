import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, Upload, Database, Search, CheckCircle2, Users, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import step1Screenshot from "@/assets/step1-screenshot.png";
import step3Plumber from "@/assets/step3-plumber.png";
import step3Gather from "@/assets/step3-gather.png";

const Home = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">The Spark Squad</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Resource Management Platform
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-white/90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Managing Grassroots Volunteers' Participation
          </p>
          <p className="text-lg md:text-xl mb-10 text-white/80 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
            A flexible CRM portal that works with your existing tools—no more scrambling for Excel sheets. Automatically capture attendance from WhatsApp polls, photos, or notes, track contributions, and build stronger community connections.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/tools')}
            className="bg-white text-primary hover:bg-white/90 shadow-lg text-lg px-8 py-6 hover-scale animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Start Using The Tool
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 bg-[image:var(--gradient-card)] shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                <Target className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h2 className="text-3xl font-bold">What This Tool Does</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A singular platform that allows plug-and-play across committees and COs. This resource management system helps ground officers focus on meaningful volunteer engagement rather than data entry. Works seamlessly with WhatsApp polls, photos, and any format you already use – no disruption to your current workflow.
            </p>
          </Card>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">The Pain Point</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              As ground officers, you know the drill: no more scrambling for Excel sheets after every event, hunting through separate files for different activities, or struggling to pull up a volunteer's full participation history when you need it.
            </p>
            <p>
              This fragmented approach—whether from WhatsApp polls, photos, or handwritten notes—takes time away from actual engagement, makes handovers difficult, and creates coordination gaps when volunteers participate across different COs.
            </p>
            <p className="font-semibold text-foreground">
              The focus should be on managing volunteers' participation and building community, not on administrative tasks.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">How It Helps You</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Works with whatever format you're already using—WhatsApp poll screenshots, photos of attendance sheets, typed notes, PDFs, or Excel files. The platform automatically extracts attendance and contributions, then syncs to GatherSG. Simple plug-and-play across all committees.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card 
              className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold transition-all duration-300 ${hoveredCard === 0 ? 'scale-110 bg-primary/20' : ''}`}>
                  1
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Input Made Simple</h3>
              </div>
              <img 
                src={step1Screenshot} 
                alt="Step 1: Input interface showing event name, meeting notes, and upload options" 
                className="w-full rounded-lg mb-4 shadow-md"
              />
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

            <Card 
              className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold transition-all duration-300 ${hoveredCard === 1 ? 'scale-110 bg-primary/20' : ''}`}>
                  2
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Automatic Organisation</h3>
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

            <Card 
              className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold transition-all duration-300 ${hoveredCard === 2 ? 'scale-110 bg-primary/20' : ''}`}>
                  3
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Seamless Integration with Gather through Plumber Webhooks</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Once organised, volunteer information is automatically sent to your Gather case management system through Plumber webhooks for comprehensive tracking and follow-up, ensuring no volunteer or opportunity falls through the cracks.
              </p>
              <img 
                src={step3Plumber} 
                alt="Plumber webhook configuration showing successful data transmission" 
                className="w-full rounded-lg shadow-md"
              />
            </Card>

            <Card 
              className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold transition-all duration-300 ${hoveredCard === 3 ? 'scale-110 bg-primary/20' : ''}`}>
                  4
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Instant Profile Access</h3>
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
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">The Real Impact: Focus on People, Not Admin</h2>
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            A flexible resource management platform that works with your existing tools transforms how you manage volunteer participation and build community:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2 group">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Database className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Data Accessibility & Continuity</h3>
              </div>
              <p className="text-muted-foreground">
                Instead of attendance data sitting in individual Excel files, centralised access means any staff member can instantly view historical participation patterns – crucial for handovers or when volunteers move between committees.
              </p>
            </Card>

            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2 group">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Sparkles className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Recognition & Engagement</h3>
              </div>
              <p className="text-muted-foreground">
                With consolidated data, easily identify consistent contributors, spot declining participation early, and tailor recognition efforts – directly supporting your "recognise, spark, and nurture" objective.
              </p>
            </Card>

            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2 group">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Users className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Cross-CO Collaboration</h3>
              </div>
              <p className="text-muted-foreground">
                When volunteers participate across different COs, their full contribution profile becomes visible, enabling better coordination and avoiding volunteer burnout.
              </p>
            </Card>

            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2 group">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <TrendingUp className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Non-Disruptive & Flexible</h3>
              </div>
              <p className="text-muted-foreground">
                Works alongside your current tools—WhatsApp, photos, Excel—without forcing workflow changes. Simple plug-and-play means more time for meaningful community building, less time scrambling for data.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Use This?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A singular platform that works with all your existing tools—no more scrambling for Excel sheets or juggling multiple formats. Centralised volunteer participation management means you spot consistent contributors faster, identify re-engagement opportunities, and maintain complete histories across committees and COs.
          </p>
          <p className="text-xl font-semibold mt-6 text-foreground">
            Focus on what matters: managing volunteers' participation, nurturing community connections, and building stronger grassroots engagement.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Try It?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start using the tool to streamline your volunteer tracking. Enter your meeting notes, let the system handle the data extraction, and have everything sync to Gather automatically. More time for engagement, less time on admin.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/tools')}
            className="text-lg px-8 py-6 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] hover-scale transition-all duration-300"
          >
            Start Using The Tool
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Simple volunteer tracking for busy ground officers
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
