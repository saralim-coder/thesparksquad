import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Users, Heart, TrendingUp, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe in empowering grassroots leaders to build stronger, more engaged communities through better volunteer management."
    },
    {
      icon: Target,
      title: "Simplicity & Effectiveness",
      description: "Complex problems need simple solutions. We focus on making volunteer management effortless so leaders can focus on people."
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description: "Built with feedback from ground officers, we're constantly evolving to meet the real needs of grassroots organizations."
    }
  ];

  const team = [
    {
      name: "The Spark Squad",
      role: "Development Team",
      description: "A passionate team dedicated to supporting grassroots communities through innovative technology solutions."
    }
  ];

  const stats = [
    { label: "Active Users", value: "500+", icon: Users },
    { label: "Volunteers Tracked", value: "10,000+", icon: Award },
    { label: "Hours Saved Monthly", value: "2,000+", icon: TrendingUp },
    { label: "Communities Served", value: "50+", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">About The Spark Squad</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Building Tools That Matter
          </h1>
          <p className="text-xl md:text-2xl text-white/90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Empowering grassroots leaders to spend less time on admin and more time building community
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 bg-[image:var(--gradient-card)] shadow-[var(--shadow-medium)]">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              We're on a mission to transform how grassroots organizations manage volunteer participation. 
              By eliminating tedious administrative tasks, we enable ground officers to focus on what truly 
              matters—recognizing, sparking, and nurturing the volunteers who make community work possible. 
              Our platform is built on the principle that better data management leads to better community engagement.
            </p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Impact By Numbers</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2 group text-center"
                >
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-4">
                    <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 hover:-translate-y-2 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-4">
                      <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Meet The Team</h2>
          <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={index}
                className="p-8 bg-[image:var(--gradient-card)] shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all duration-500 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary via-primary-glow to-accent mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us In Making A Difference</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be part of the movement to transform grassroots volunteer management
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/tools')}
            className="text-lg px-8 py-6 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] hover-scale transition-all duration-300"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
