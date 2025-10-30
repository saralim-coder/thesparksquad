import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Award, TrendingUp, Heart, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              Building Communities Together
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Empower Your Community
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                One Volunteer at a Time
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Help your Constituency Office recognize, spark, and nurture volunteer contributions. 
              Manage grassroots participation with clarity and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/ai-tools">
                <Button size="lg" className="text-lg shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-soft)] transition-all">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try AI Tools
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg border-2">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Users, value: "2,847", label: "Active Volunteers", color: "text-primary" },
              { icon: Calendar, value: "156", label: "Events This Month", color: "text-secondary" },
              { icon: Award, value: "423", label: "Recognitions Given", color: "text-accent" },
              { icon: TrendingUp, value: "34%", label: "Growth This Year", color: "text-primary" },
            ].map((stat, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-[var(--shadow-medium)] transition-all bg-[image:var(--gradient-card)]">
                <stat.icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Everything You Need to Build Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to help constituency offices coordinate, celebrate, and grow volunteer participation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Volunteer Management",
                description: "Track volunteer profiles, skills, and availability. Know who's ready to help at a glance.",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: Calendar,
                title: "Event Coordination",
                description: "Plan meetings, activities, and events. Track attendance and participation effortlessly.",
                color: "bg-secondary/10 text-secondary",
              },
              {
                icon: Heart,
                title: "Recognition System",
                description: "Celebrate contributions, award milestones, and show appreciation to those who serve.",
                color: "bg-accent/10 text-accent",
              },
              {
                icon: Target,
                title: "Impact Tracking",
                description: "Measure community engagement and volunteer hours to understand your collective impact.",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: TrendingUp,
                title: "Growth Insights",
                description: "Visualize trends, identify opportunities, and make data-informed decisions.",
                color: "bg-secondary/10 text-secondary",
              },
              {
                icon: Award,
                title: "We-First Culture",
                description: "Foster collaboration, shared ownership, and a true sense of community belonging.",
                color: "bg-accent/10 text-accent",
              },
            ].map((feature, idx) => (
              <Card 
                key={idx} 
                className="p-8 hover:shadow-[var(--shadow-medium)] transition-all group cursor-pointer bg-[image:var(--gradient-card)]"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center bg-[image:var(--gradient-card)] shadow-[var(--shadow-medium)]">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Community Engagement?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join constituency offices across the region in building stronger, more connected communities through effective volunteer management.
            </p>
            <Button size="lg" className="text-lg shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-soft)] transition-all">
              Start Your Journey
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Building a we-first society, one volunteer at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
