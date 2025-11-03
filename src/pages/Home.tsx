import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, Upload, Database, Search, CheckCircle2, Users, Target, TrendingUp } from "lucide-react";

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
              Ground officers across Singapore's Constituency Offices face a common struggle: valuable time and energy are consumed by complex, repetitive administrative tasks. Manual processes, fragmented systems, and duplicative workflows create barriers between officers and the communities they serve.
            </p>
            <p className="font-semibold text-foreground">
              The result? Less meaningful engagement with residents and missed opportunities to cultivate the volunteer spirit that makes Singapore's grassroots movement so powerful.
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
                <h3 className="text-xl font-bold">Seamless Integration with Gather</h3>
              </div>
              <p className="text-muted-foreground">
                Once organised, volunteer information is automatically sent to your Gather case management system for comprehensive tracking and follow-up, ensuring no volunteer or opportunity falls through the cracks.
              </p>
            </Card>

            <Card className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold">Instant Profile Access</h3>
              </div>
              <p className="text-muted-foreground">
                Staff can easily search and filter the complete history of any volunteer by simply entering their email address. Access their customer profile to view their entire journey, contributions, and engagement patterns at a glance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">The Complete Benefits</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Save Hours Weekly – No more manual data entry",
              "Never Miss Talent – Automatically capture volunteer skills",
              "Enhance Recognition – Track contributions systematically",
              "Improve Matching – Connect volunteers with suitable opportunities",
              "Streamlined Tracking – Direct integration with Gather",
              "Instant Profile Access – Search volunteer history by email",
              "Build Stronger Records – Comprehensive volunteer profiles",
              "Better Follow-up – Track every volunteer interaction",
              "Personalised Engagement – Access complete volunteer journey"
            ].map((benefit, index) => (
              <Card key={index} className="p-4 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-[var(--transition-smooth)]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{benefit}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why It Matters</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Strong communities are built on strong volunteer networks. When Constituency Office colleagues can efficiently capture, organise, track, and instantly access volunteer information, they create space for deeper relationships, better recognition of contributions, and more strategic volunteer engagement.
          </p>
          <p className="text-xl font-semibold mt-6 text-foreground">
            Together, we're not just improving processes – we're building a truly we-first society where every volunteer feels valued, every contribution is recognised, and every community connection sparks positive change.
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
