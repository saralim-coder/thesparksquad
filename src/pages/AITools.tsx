import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import AttendanceExtractor from "@/components/AttendanceExtractor";
import CompetencyAnalyzer from "@/components/CompetencyAnalyzer";

const AITools = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Tools</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Smart Volunteer Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leverage AI to extract attendance from meeting notes and analyze volunteer competencies from accomplishments
            </p>
          </div>
        </div>

        <Card className="max-w-6xl mx-auto p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-medium)]">
          <Tabs defaultValue="attendance" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="attendance" className="text-base">
                📝 Extract Attendance
              </TabsTrigger>
              <TabsTrigger value="competencies" className="text-base">
                🎯 Analyze Competencies
              </TabsTrigger>
            </TabsList>

            <TabsContent value="attendance" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">
                  Extract Attendance from Meeting Notes
                </h2>
                <p className="text-muted-foreground">
                  Paste your meeting notes below. AI will automatically identify and extract only those who attended, 
                  ignoring absent members.
                </p>
              </div>
              <AttendanceExtractor />
            </TabsContent>

            <TabsContent value="competencies" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">
                  AI-Powered Competency Analysis
                </h2>
                <p className="text-muted-foreground">
                  Describe volunteer accomplishments and let AI identify their competencies, assess proficiency levels, 
                  and provide evidence-based analysis.
                </p>
              </div>
              <CompetencyAnalyzer />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AITools;
