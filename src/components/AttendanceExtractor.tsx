import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Attendee {
  name: string;
  designation: string;
}

const AttendanceExtractor = () => {
  const [eventName, setEventName] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const { toast } = useToast();

  const handleExtract = async () => {
    if (!eventName.trim()) {
      toast({
        title: "Event name required",
        description: "Please enter an event or meeting name",
        variant: "destructive",
      });
      return;
    }

    if (!meetingNotes.trim()) {
      toast({
        title: "Meeting notes required",
        description: "Please paste your meeting notes",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("extract-attendance", {
        body: { meetingNotes, eventName },
      });

      if (error) {
        if (error.message.includes("429")) {
          toast({
            title: "Rate limit exceeded",
            description: "Please try again in a few moments",
            variant: "destructive",
          });
        } else if (error.message.includes("402")) {
          toast({
            title: "Credits required",
            description: "Please add credits to your workspace",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      setAttendees(data.attendees);
      toast({
        title: "Attendance extracted!",
        description: `Found ${data.attendees.length} attendees`,
      });
    } catch (error) {
      console.error("Error extracting attendance:", error);
      toast({
        title: "Extraction failed",
        description: "Unable to extract attendance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exampleNotes = `Attended:
John, IT
Sarah Johnson, Senior Developer
Mike Chen - QA Lead
Emily Davis (Client Success)

Not attended:
Sharon, Finance
Tom Brown, Marketing Manager`;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="eventName">🎯 Event or Meeting Name</Label>
          <Input
            id="eventName"
            placeholder="e.g., Monthly Volunteer Meeting"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            💡 This event name will be tagged with each attendance record for easy tracking
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meetingNotes">📝 Paste Meeting Notes</Label>
          <Textarea
            id="meetingNotes"
            placeholder={exampleNotes}
            value={meetingNotes}
            onChange={(e) => setMeetingNotes(e.target.value)}
            rows={10}
            className="font-mono text-sm"
          />
          <p className="text-sm text-muted-foreground">
            Drop in your meeting notes of who attended and who didn&apos;t — AI will only extract attendance for those who attended
          </p>
        </div>

        <Button
          onClick={handleExtract}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Extracting Attendance...
            </>
          ) : (
            <>
              🚀 Extract Attendance from Notes
            </>
          )}
        </Button>
      </div>

      {attendees.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Extracted Attendees</h3>
            <span className="text-sm text-muted-foreground">
              {attendees.length} attendees found
            </span>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead className="text-center">Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.map((attendee, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{attendee.name}</TableCell>
                    <TableCell>{attendee.designation}</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceExtractor;
