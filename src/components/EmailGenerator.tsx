
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { copy, mail, save } from "lucide-react";
import { JobData } from "@/types/jobTypes";
import { useToast } from "@/components/ui/use-toast";

interface EmailGeneratorProps {
  jobData: JobData | null;
}

const EmailGenerator = ({ jobData }: EmailGeneratorProps) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState(jobData?.emailSubject || "");
  const [emailBody, setEmailBody] = useState(jobData?.emailBody || "");
  
  if (!jobData) return null;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The email content has been copied to your clipboard.",
    });
  };
  
  const openInGmail = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(gmailUrl, "_blank");
  };
  
  const openInOutlook = () => {
    const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(outlookUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Application Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Input 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Body</label>
            <Textarea 
              value={emailBody} 
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Email content"
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-between">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(emailBody)}>
              <copy className="h-4 w-4 mr-2" />
              Copy Body
            </Button>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(`Subject: ${subject}\n\n${emailBody}`)}>
              <copy className="h-4 w-4 mr-2" />
              Copy All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={openInGmail}>
              <mail className="h-4 w-4 mr-2" />
              Open in Gmail
            </Button>
            <Button size="sm" variant="outline" onClick={openInOutlook}>
              <mail className="h-4 w-4 mr-2" />
              Open in Outlook
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailGenerator;
