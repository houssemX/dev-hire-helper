
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { copy, file-text, save } from "lucide-react";
import { JobData } from "@/types/jobTypes";
import { useToast } from "@/components/ui/use-toast";

interface CoverLetterGeneratorProps {
  jobData: JobData | null;
}

const CoverLetterGenerator = ({ jobData }: CoverLetterGeneratorProps) => {
  const { toast } = useToast();
  const [coverLetter, setCoverLetter] = useState(jobData?.coverLetter || "");
  
  if (!jobData) return null;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    toast({
      title: "Copied to clipboard",
      description: "The cover letter has been copied to your clipboard.",
    });
  };
  
  const downloadAsTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([coverLetter], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${jobData.company.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Cover Letter</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="min-h-[400px] font-serif"
          />
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-2">
          <Button variant="outline" onClick={copyToClipboard}>
            <copy className="h-4 w-4 mr-2" />
            Copy to Clipboard
          </Button>
          <Button onClick={downloadAsTxt}>
            <save className="h-4 w-4 mr-2" />
            Download as TXT
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CoverLetterGenerator;
