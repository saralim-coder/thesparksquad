import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, ArrowLeft, CalendarIcon } from "lucide-react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface ExtractedData {
  name: string;
  designation: string;
  nric?: string;
  contributions: Array<{
    highlight: string;
  }>;
}

interface FlattenedRow {
  originalIndex: number;
  name: string;
  designation: string;
  nric?: string;
  highlight: string;
}

const nricSchema = z.string().trim().regex(/^\d{3}[A-Z]$/i, { message: "Invalid format (e.g., 567A)" }).length(4, { message: "Must be exactly 4 characters" });

const AITools = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState<Date>();
  const [meetingNotes, setMeetingNotes] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData[]>([]);
  const [flattenedRows, setFlattenedRows] = useState<FlattenedRow[]>([]);
  const [nricErrors, setNricErrors] = useState<Record<number, string>>({});
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const { toast } = useToast();
  const navigate = useNavigate();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_IMAGE_DIMENSION = 1920;

  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize if too large
          if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
            if (width > height) {
              height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
              width = MAX_IMAGE_DIMENSION;
            } else {
              width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
              height = MAX_IMAGE_DIMENSION;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.8 quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(compressedDataUrl);
        };

        img.onerror = () => reject(new Error('Failed to load image'));
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setFilePreviewUrl(null);
      return;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);

    // Generate preview for images
    if (file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreviewUrl(previewUrl);
    } else {
      setFilePreviewUrl(null);
    }
  };

  const handleFileExtract = async () => {
    if (!eventName.trim()) {
      toast({
        title: "Event name required",
        description: "Please enter an event or meeting name",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "File required",
        description: "Please upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const fileType = selectedFile.type;
      const fileName = selectedFile.name.toLowerCase();
      
      // Branch by file type to choose best extraction path
      const isPdf = fileType === 'application/pdf' || fileName.endsWith('.pdf');
      const isExcel = fileType.includes('spreadsheet') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      // PDF: extract text with pdfjs and send as meetingNotes
      if (isPdf) {
        toast({ title: 'Reading PDF…', description: 'Extracting text from pages for analysis' });
        try {
          const pdfjs = await import('pdfjs-dist');
          
          // Use CDN-hosted worker
          pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

          const arrayBuffer = await selectedFile.arrayBuffer();
          const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
          let text = '';
          for (let p = 1; p <= pdf.numPages; p++) {
            const page = await pdf.getPage(p);
            const content = await page.getTextContent();
            const pageText = (content.items || []).map((it: any) => it.str).join(' ');
            text += pageText + '\n';
          }

          const { data, error } = await supabase.functions.invoke('extract-combined-data', {
            body: {
              meetingNotes: `Extracted from PDF ${selectedFile.name}:\n\n${text}`,
              eventName,
            },
          });

          if (error) {
            console.error('Extraction error (PDF):', error);
            if (error.message?.includes('429') || error.message?.includes('Rate limit')) {
              toast({ title: 'Rate limit exceeded', description: 'Please try again in a few moments', variant: 'destructive' });
            } else if (error.message?.includes('402') || error.message?.includes('Credits')) {
              toast({ title: 'Credits required', description: 'Please add credits to your workspace to continue using AI features', variant: 'destructive' });
            } else {
              toast({ title: 'Extraction failed', description: error.message || 'Unable to extract data from PDF', variant: 'destructive' });
            }
            return;
          }
          processExtractedData(data);
          return;
        } catch (pdfError) {
          console.error('PDF read error:', pdfError);
          toast({ title: 'PDF processing failed', description: 'Could not read this PDF. Please try another file.', variant: 'destructive' });
          return;
        }
      }

      // Excel: parse sheets to CSV text and send as meetingNotes
      if (isExcel) {
        toast({ title: 'Reading spreadsheet…', description: 'Parsing sheets for analysis' });
        try {
          const XLSX: any = await import('xlsx');
          const wb = XLSX.read(await selectedFile.arrayBuffer(), { type: 'array' });
          let text = '';
          for (const name of wb.SheetNames) {
            const sheet = wb.Sheets[name];
            const csv = XLSX.utils.sheet_to_csv(sheet);
            text += `Sheet: ${name}\n${csv}\n`;
          }

          const { data, error } = await supabase.functions.invoke('extract-combined-data', {
            body: {
              meetingNotes: `Extracted from spreadsheet ${selectedFile.name}:\n\n${text}`,
              eventName,
            },
          });

          if (error) {
            console.error('Extraction error (Excel):', error);
            if (error.message?.includes('429') || error.message?.includes('Rate limit')) {
              toast({ title: 'Rate limit exceeded', description: 'Please try again in a few moments', variant: 'destructive' });
            } else if (error.message?.includes('402') || error.message?.includes('Credits')) {
              toast({ title: 'Credits required', description: 'Please add credits to your workspace to continue using AI features', variant: 'destructive' });
            } else {
              toast({ title: 'Extraction failed', description: error.message || 'Unable to extract data from spreadsheet', variant: 'destructive' });
            }
            return;
          }
          processExtractedData(data);
          return;
        } catch (xlsxError) {
          console.error('Excel read error:', xlsxError);
          toast({ title: 'Spreadsheet processing failed', description: 'Could not read this spreadsheet. Please try another file.', variant: 'destructive' });
          return;
        }
      }

      // Images: compress and send as imageData
      // Images, PDFs, and Excel files can all be processed visually by the AI
      let base64Data: string;
      
      // Compress images for better performance
      if (fileType.startsWith('image/')) {
        toast({
          title: 'Optimizing image...',
          description: 'Compressing and preparing file for extraction',
        });
        base64Data = await compressImage(selectedFile);
      } else {
        // Fallback: treat as generic document via base64
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        base64Data = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
      }
      
      try {
        // Determine file type for better prompt
        let fileTypeDescription = 'document';
        if (fileType.startsWith('image/')) fileTypeDescription = 'image';

        toast({ title: 'Processing file...', description: `Analyzing ${fileTypeDescription} and extracting volunteer data` });
        
        const { data, error } = await supabase.functions.invoke('extract-combined-data', {
          body: { 
            imageData: base64Data, 
            eventName,
            fileType: fileTypeDescription 
          },
        });

        if (error) {
          console.error('Extraction error:', error);
          if (error.message?.includes('429') || error.message?.includes('Rate limit')) {
            toast({ title: 'Rate limit exceeded', description: 'Please try again in a few moments', variant: 'destructive' });
          } else if (error.message?.includes('402') || error.message?.includes('Credits')) {
            toast({ title: 'Credits required', description: 'Please add credits to your workspace to continue using AI features', variant: 'destructive' });
          } else if (error.message?.includes('Unable to process')) {
            toast({ title: 'File processing failed', description: 'Please ensure your file contains readable text, tables, or clear images. Try a different file format if the issue persists.', variant: 'destructive' });
          } else {
            toast({ title: 'Extraction failed', description: error.message || 'Unable to extract data from file', variant: 'destructive' });
          }
          return;
        }

        processExtractedData(data);
      } catch (error) {
        console.error('Error processing file:', error);
        throw error;
      }
    } catch (error) {
      console.error("Error extracting data from file:", error);
      toast({
        title: "Extraction failed",
        description: "Unable to extract data from file. Please ensure the file is readable and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const processExtractedData = (data: any) => {
    setExtractedData(data.extractedData);
    
    const flattened: FlattenedRow[] = [];
    data.extractedData.forEach((person: ExtractedData, index: number) => {
      if (person.contributions.length === 0) {
        flattened.push({
          originalIndex: index,
          name: person.name,
          designation: person.designation,
          nric: person.nric,
          highlight: "",
        });
      } else {
        person.contributions.forEach((contrib) => {
          flattened.push({
            originalIndex: index,
            name: person.name,
            designation: person.designation,
            nric: person.nric,
            highlight: contrib.highlight,
          });
        });
      }
    });
    
    setFlattenedRows(flattened);
    
    toast({
      title: "Extraction complete!",
      description: `Found ${data.extractedData.length} attendees with ${flattened.length} total contributions`,
    });
  };

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
      const { data, error } = await supabase.functions.invoke("extract-combined-data", {
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

      setExtractedData(data.extractedData);
      
      // Flatten data: each contribution becomes a row
      const flattened: FlattenedRow[] = [];
      data.extractedData.forEach((person: ExtractedData, index: number) => {
        if (person.contributions.length === 0) {
          // Person with no contributions still gets one row
          flattened.push({
            originalIndex: index,
            name: person.name,
            designation: person.designation,
            nric: person.nric,
            highlight: "",
          });
        } else {
          // Each contribution gets its own row
          person.contributions.forEach((contrib) => {
            flattened.push({
              originalIndex: index,
              name: person.name,
              designation: person.designation,
              nric: person.nric,
              highlight: contrib.highlight,
            });
          });
        }
      });
      
      setFlattenedRows(flattened);
      
      toast({
        title: "Extraction complete!",
        description: `Found ${data.extractedData.length} attendees with ${flattened.length} total contributions`,
      });
    } catch (error) {
      console.error("Error extracting data:", error);
      toast({
        title: "Extraction failed",
        description: "Unable to extract data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNRICChange = (rowIndex: number, nric: string) => {
    const updated = [...flattenedRows];
    updated[rowIndex].nric = nric;
    setFlattenedRows(updated);
    
    // Update original data
    const updatedOriginal = [...extractedData];
    updatedOriginal[updated[rowIndex].originalIndex].nric = nric;
    setExtractedData(updatedOriginal);
  };

  const handleFieldChange = (rowIndex: number, field: keyof FlattenedRow, value: string) => {
    const updated = [...flattenedRows];
    updated[rowIndex] = { ...updated[rowIndex], [field]: value };
    setFlattenedRows(updated);
    
    // Validate NRIC format if the field being changed is nric
    if (field === 'nric') {
      const newNricErrors = { ...nricErrors };
      
      if (value.trim()) {
        const result = nricSchema.safeParse(value);
        if (!result.success) {
          newNricErrors[rowIndex] = result.error.errors[0].message;
        } else {
          delete newNricErrors[rowIndex];
        }
      } else {
        delete newNricErrors[rowIndex];
      }
      
      setNricErrors(newNricErrors);
    }
  };

  const sendWebhook = async (rowIndex?: number) => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Webhook URL required",
        description: "Please enter your webhook URL",
        variant: "destructive",
      });
      return;
    }

    // Determine which rows to send
    let rowsToSend: FlattenedRow[];
    if (rowIndex !== undefined) {
      // Single row
      rowsToSend = [flattenedRows[rowIndex]];
    } else if (selectedRows.size > 0) {
      // Selected rows only
      rowsToSend = flattenedRows.filter((_, idx) => selectedRows.has(idx));
    } else {
      // All rows
      rowsToSend = flattenedRows;
    }
    
    // Validate NRICs are present
    const missingNRICs = rowsToSend.filter(row => !row.nric?.trim());
    
    if (missingNRICs.length > 0) {
      toast({
        title: "NRIC required",
        description: `Please enter NRIC for all attendees before sending to case system`,
        variant: "destructive",
      });
      return;
    }
    
    // Validate NRIC formats
    const invalidNRICs = rowsToSend.filter(row => {
      if (row.nric?.trim()) {
        const result = nricSchema.safeParse(row.nric);
        return !result.success;
      }
      return false;
    });
    
    if (invalidNRICs.length > 0) {
      toast({
        title: "Invalid NRIC format",
        description: `Please correct the NRIC format for all attendees before sending`,
        variant: "destructive",
      });
      return;
    }

    // If sending all rows, send them one by one sequentially
    if (rowIndex === undefined && rowsToSend.length > 1) {
      let successCount = 0;
      let failCount = 0;

      for (let i = 0; i < rowsToSend.length; i++) {
        const row = rowsToSend[i];
        try {
          const { data, error } = await supabase.functions.invoke('forward-plumber-webhook', {
            body: {
              webhookUrl,
              payload: {
                eventName,
                eventDate: eventDate ? format(eventDate, "yyyy-MM-dd") : undefined,
                data: [row],
                timestamp: new Date().toISOString(),
                triggered_from: window.location.origin,
              },
            },
          });

          if (error) throw error;

          if (!data?.ok) {
            throw new Error(data?.message || `Upstream error (status ${data?.status})`);
          }

          successCount++;
          
          toast({
            title: `Sent ${i + 1}/${rowsToSend.length}`,
            description: `Successfully sent: ${row.name}`,
          });

          // Small delay between requests to avoid rate limiting
          if (i < rowsToSend.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error(`Error sending row ${i + 1}:`, error);
          failCount++;
          toast({
            title: `Failed to send row ${i + 1}`,
            description: error instanceof Error ? error.message : 'Unable to send data',
            variant: 'destructive',
          });
        }
      }

      // Final summary toast
      if (successCount > 0) {
        toast({
          title: 'Batch send complete',
          description: `Successfully sent ${successCount} out of ${rowsToSend.length} rows${failCount > 0 ? `. ${failCount} failed.` : '.'}`,
        });
      }
      return;
    }

    // Single row send
    try {
      const { data, error } = await supabase.functions.invoke('forward-plumber-webhook', {
        body: {
          webhookUrl,
          payload: {
            eventName,
            eventDate: eventDate ? format(eventDate, "yyyy-MM-dd") : undefined,
            data: rowsToSend,
            timestamp: new Date().toISOString(),
            triggered_from: window.location.origin,
          },
        },
      });

      if (error) throw error;

      if (!data?.ok) {
        throw new Error(data?.message || `Upstream error (status ${data?.status})`);
      }

      toast({
        title: 'Data sent successfully',
        description: `Row ${rowIndex! + 1} sent to GatherSG via Plumber webhook.`,
      });
    } catch (error) {
      console.error('Webhook error:', error);
      toast({
        title: 'Webhook failed',
        description:
          error instanceof Error
            ? error.message
            : 'Unable to send data to webhook. Please verify your Plumber webhook URL.',
        variant: 'destructive',
      });
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Expert":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "Advanced":
        return "bg-primary/20 text-primary border-primary/30";
      case "Intermediate":
        return "bg-accent/20 text-accent border-accent/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const exampleNotes = `Attended:
Sara Chen, Volunteer Coordinator, 567A - Helped set up food distribution area
John Tan, Event Lead, 543B - Organized 25 volunteers for the community clean-up, collected 150kg of recyclables
Mike Wong - Community Outreach - Led senior citizens tech literacy session with 15 participants
Emily Koh (Fundraising) 321C - Coordinated donation drive raising $5,000 for local shelter

Not attended:
David Lee, Logistics
Maria Santos, Communications Manager`;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Platform</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Empower Your Community
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            One Volunteer at a Time
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Extract attendance and key contribution highlights from meeting notes, then send directly to GatherSG
          </p>
        </div>

        <Card className="max-w-6xl mx-auto p-6 bg-[image:var(--gradient-card)] shadow-[var(--shadow-medium)]">
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
              </div>

              <div className="space-y-2">
                <Label>📅 Event or Meeting Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !eventDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {eventDate ? format(eventDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={eventDate}
                      onSelect={setEventDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingNotes">📝 Paste Event/Meeting Notes</Label>
                <Textarea
                  id="meetingNotes"
                  placeholder={exampleNotes}
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  rows={12}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  AI will extract names, designations, NRICs (last 3 digits + letter, e.g., 567A) and key contribution highlights. If the data is not available, it will be blank.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fileUpload">📎 Or Upload File (Image, PDF, Excel)</Label>
                <Input
                  id="fileUpload"
                  type="file"
                  accept="image/*,.pdf,.xlsx,.xls,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                />
                {selectedFile && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <span className="font-medium">Selected: {selectedFile.name}</span>
                      <span className="text-muted-foreground">
                        ({(selectedFile.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    {filePreviewUrl && (
                      <div className="border rounded-lg p-2 bg-muted/50">
                        <img 
                          src={filePreviewUrl} 
                          alt="File preview" 
                          className="max-w-full h-auto max-h-[200px] object-contain mx-auto rounded"
                        />
                      </div>
                    )}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  Upload images (photos, WhatsApp screenshots), PDF documents, or Excel spreadsheets. Files up to 10MB. Images will be automatically optimized for faster processing.
                </p>
              </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">🔗 Plumber Webhook URL (To GatherSG)</Label>
                  <Input
                    id="webhookUrl"
                    placeholder="https://plumber.gov.sg/webhooks/your-webhook-id"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Data will be sent as JSON: {`{ "eventName": "...", "data": [...] }`}
                  </p>
                  <p className="text-sm text-destructive font-medium">
                    ⚠️ NRIC (last 3 digits + letter) is required for all rows before sending
                  </p>
                </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleExtract}
                  disabled={isLoading || !meetingNotes.trim()}
                  className="flex-1"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      🚀 Extract from Notes
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleFileExtract}
                  disabled={isLoading || !selectedFile}
                  className="flex-1"
                  size="lg"
                  variant="secondary"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      📎 Extract from File
                    </>
                  )}
                </Button>
              </div>
            </div>

            {flattenedRows.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">Extracted Data</h3>
                    {selectedRows.size > 0 && (
                      <Badge variant="secondary">{selectedRows.size} selected</Badge>
                    )}
                  </div>
                  <Button
                    onClick={() => sendWebhook()}
                    variant="secondary"
                    disabled={
                      (selectedRows.size === 0 && flattenedRows.some(row => !row.nric?.trim())) ||
                      (selectedRows.size > 0 && Array.from(selectedRows).some(idx => !flattenedRows[idx].nric?.trim() || nricErrors[idx])) ||
                      Object.keys(nricErrors).length > 0
                    }
                  >
                    {selectedRows.size > 0 ? `Send ${selectedRows.size} Selected` : 'Send All to Webhook'}
                    {((selectedRows.size === 0 && flattenedRows.some(row => !row.nric?.trim())) ||
                      (selectedRows.size > 0 && Array.from(selectedRows).some(idx => !flattenedRows[idx].nric?.trim())) ||
                      Object.keys(nricErrors).length > 0) && (
                      <span className="ml-2 text-xs">
                        ({Object.keys(nricErrors).length > 0 ? 'Invalid NRICs' : 'Missing NRICs'})
                      </span>
                    )}
                  </Button>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedRows.size === flattenedRows.length}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedRows(new Set(flattenedRows.map((_, idx) => idx)));
                              } else {
                                setSelectedRows(new Set());
                              }
                            }}
                          />
                        </TableHead>
                        <TableHead className="w-12">No.</TableHead>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Event Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead>NRIC *</TableHead>
                        <TableHead>Key Highlights</TableHead>
                        <TableHead className="text-center w-32">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {flattenedRows.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Checkbox
                              checked={selectedRows.has(index)}
                              onCheckedChange={(checked) => {
                                const newSelected = new Set(selectedRows);
                                if (checked) {
                                  newSelected.add(index);
                                } else {
                                  newSelected.delete(index);
                                }
                                setSelectedRows(newSelected);
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>
                            <div className="min-w-[150px] px-2 py-1 bg-muted/50 rounded text-sm">
                              {eventName}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="min-w-[120px] px-2 py-1 bg-muted/50 rounded text-sm">
                              {eventDate ? format(eventDate, "PPP") : "-"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="Name"
                              value={row.name}
                              onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                              className="min-w-[150px]"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="Designation"
                              value={row.designation || ""}
                              onChange={(e) => handleFieldChange(index, 'designation', e.target.value)}
                              className="min-w-[150px]"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Input
                                placeholder="e.g., 567A"
                                value={row.nric || ""}
                                onChange={(e) => handleFieldChange(index, 'nric', e.target.value.toUpperCase())}
                                className={`min-w-[120px] ${!row.nric?.trim() || nricErrors[index] ? 'border-destructive' : ''}`}
                                maxLength={4}
                              />
                              {!row.nric?.trim() && (
                                <p className="text-xs text-destructive">Required (last 3 digits + letter)</p>
                              )}
                              {row.nric?.trim() && nricErrors[index] && (
                                <p className="text-xs text-destructive">{nricErrors[index]}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Textarea
                              placeholder="Key Highlights"
                              value={row.highlight || ""}
                              onChange={(e) => handleFieldChange(index, 'highlight', e.target.value)}
                              className="min-w-[300px] min-h-[80px]"
                              rows={3}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              size="sm"
                              onClick={() => sendWebhook(index)}
                              variant="outline"
                              disabled={!row.nric?.trim() || !!nricErrors[index]}
                            >
                              {!row.nric?.trim() ? 'NRIC Required' : nricErrors[index] ? 'Invalid NRIC' : 'Send Row'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AITools;
