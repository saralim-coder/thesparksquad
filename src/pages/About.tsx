import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const About = () => {
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
    </div>
  );
};

export default About;
