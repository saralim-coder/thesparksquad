import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, Upload, Database, Search, CheckCircle2, Users, Target, TrendingUp } from "lucide-react";
import step1Screenshot from "@/assets/step1-screenshot.png";
import step3Plumber from "@/assets/step3-plumber.png";
import step3Gather from "@/assets/step3-gather.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">The Spark Squad</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Empowering Community Connections
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-white/90">
            Igniting Volunteer Engagement, One Connection at a Time
          </p>
          <p className="text-lg md:text-xl mb-10 text-white/80 max-w-3xl mx-auto">
            Welcome to The Spark Squad – where we transform how Constituency Offices manage and nurture grassroots volunteer participation. We're here to help you spend less time on paperwork and more time building the vibrant, connected communities Singapore deserves.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/tools')}
            className="bg-white text-primary hover:bg-white/90 shadow-lg text-lg px-8 py-6"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 bg-[image:var(--gradient-card)] shadow-[var(--shadow-medium)]">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe every volunteer has the potential to spark positive change in their community. By streamlining administrative processes and enhancing volunteer management, we empower Constituency Office colleagues to focus on what truly matters – recognising talent, nurturing contributions, and building stronger bonds between residents and their communities.
            </p>
          </Card>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">The Challenge We're Solving</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Ground officers spend significant time on fragmented volunteer data management – manually recording attendance, maintaining separate Excel files, and struggling to access comprehensive volunteer participation histories.
            </p>
            <p>
              This administrative burden reduces time available for meaningful volunteer engagement and recognition, while making handovers and cross-CO coordination challenging.
            </p>
            <p className="font-semibold text-foreground">
              The result? Less time for recognising talent, nurturing contributions, and building the vibrant community connections that make Singapore's grassroots movement so powerful.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Smart Solution</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            The Spark Squad transforms volunteer management from burden to breakthrough with our intelligent data organisation, tracking, and retrieval system. Simply input your meeting notes or upload images, and watch as our platform automatically structures volunteer information and seamlessly integrates with your existing workflow.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold">Input Made Simple</h3>
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

            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)]">
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

            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Seamless Integration with Gather through Plumber Webhooks</h3>
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

            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)]">
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
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">The Real Impact: Beyond One Step Removed</h2>
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            While removing the Excel data entry step might seem small, the compound benefits transform how you engage with volunteers:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)]">
              <div className="flex items-start gap-3 mb-3">
                <Database className="w-6 h-6 text-primary flex-shrink-0" />
                <h3 className="text-xl font-bold">Data Accessibility & Continuity</h3>
              </div>
              <p className="text-muted-foreground">
                Instead of attendance data sitting in individual Excel files, centralised access means any staff member can instantly view historical participation patterns – crucial for handovers or when volunteers move between committees.
              </p>
            </Card>

            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)]">
              <div className="flex items-start gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-primary flex-shrink-0" />
                <h3 className="text-xl font-bold">Recognition & Engagement</h3>
              </div>
              <p className="text-muted-foreground">
                With consolidated data, easily identify consistent contributors, spot declining participation early, and tailor recognition efforts – directly supporting your "recognise, spark, and nurture" objective.
              </p>
            </Card>

            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)]">
              <div className="flex items-start gap-3 mb-3">
                <Users className="w-6 h-6 text-primary flex-shrink-0" />
                <h3 className="text-xl font-bold">Cross-CO Collaboration</h3>
              </div>
              <p className="text-muted-foreground">
                When volunteers participate across different COs, their full contribution profile becomes visible, enabling better coordination and avoiding volunteer burnout.
              </p>
            </Card>

            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)]">
              <div className="flex items-start gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0" />
                <h3 className="text-xl font-bold">Time Reallocation</h3>
              </div>
              <p className="text-muted-foreground">
                The time saved from manual data entry can be redirected to meaningful volunteer engagement activities – the real work that builds stronger communities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why It Matters</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Strong communities are built on strong volunteer networks. When ground officers can move from fragmented data management to seamless tracking, they unlock time and insight for what truly matters – recognising consistent contributors, nurturing emerging talent, and building deeper community connections.
          </p>
          <p className="text-xl font-semibold mt-6 text-foreground">
            We're not just removing a step – we're creating continuity, enabling collaboration, and empowering every Constituency Office to build a truly we-first society where every volunteer feels valued and every contribution sparks positive change.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Volunteer Management?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Experience the power of intelligent volunteer data organisation with seamless Gather integration and instant profile access. Let The Spark Squad help your team focus on what matters most – building stronger, more connected communities across Singapore.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/tools')}
            className="text-lg px-8 py-6 shadow-[var(--shadow-medium)]"
          >
            Get Started Today
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Discover how simple, connected, and insightful volunteer management can be
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
