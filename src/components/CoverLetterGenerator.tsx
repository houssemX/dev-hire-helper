
import React from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, FileText, Save } from "lucide-react";
import { JobData } from "@/types/jobTypes";
import { useToast } from "@/components/ui/use-toast";
import { useUserCV } from "@/hooks/useUserCV";

interface CoverLetterGeneratorProps {
  jobData: JobData | null;
}

const CoverLetterGenerator = ({ jobData }: CoverLetterGeneratorProps) => {
  const { toast } = useToast();
  const { userCV } = useUserCV();
  const [coverLetter, setCoverLetter] = useState<string>("");

  // Generate a cover letter based on the job data and user CV
  const generateCoverLetter = () => {
    if (!jobData || !userCV) return;
    
    // In a real extension, this would use AI to generate a personalized cover letter
    // For now, we'll use a template with the available data
    const template = `
Dear Hiring Manager,

I am writing to express my interest in the ${jobData.title} position at ${jobData.company}. With ${userCV.yearsOfExperience} years of experience as a ${userCV.title}, I believe I am an excellent fit for this role.

${jobData.isDotNetJob ? 
  `I was particularly excited to see that you are looking for someone with .NET and C# skills. These are technologies I have extensive experience with, having worked on numerous projects involving ${userCV.skills.filter(skill => ['.NET', 'C#', 'ASP.NET', 'Entity Framework'].some(s => skill.includes(s))).join(', ')}.` 
  : 
  `I have a strong background in ${userCV.skills.slice(0, 3).join(', ')}, which align well with your requirements.`
}

${jobData.requirements ? `I noticed you require experience with ${jobData.requirements.slice(0, 3).join(', ')}. During my time at ${userCV.experience[0].company}, I ${userCV.experience[0].highlights[0].toLowerCase()}.` : ''}

I would welcome the opportunity to discuss how my background, skills and experiences would make me a valuable member of your team.

Thank you for considering my application.

Sincerely,
${userCV.name}
    `;
    
    setCoverLetter(template);
    
    toast({
      title: "Cover Letter Generated",
      description: "Your customized cover letter is ready to review and copy.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    toast({
      title: "Copied to clipboard",
      description: "Cover letter has been copied to your clipboard.",
    });
  };

  const handleSave = () => {
    const blob = new Blob([coverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover_letter_${jobData?.company || 'company'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Cover Letter Saved",
      description: "Your cover letter has been saved as a text file.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Cover Letter Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={generateCoverLetter} 
            disabled={!jobData || !userCV}
            className="w-full"
          >
            Generate Personalized Cover Letter
          </Button>
          
          {coverLetter && (
            <>
              <Textarea 
                value={coverLetter} 
                onChange={(e) => setCoverLetter(e.target.value)}
                className="min-h-[300px]"
              />
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCopy} className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
                <Button variant="outline" onClick={handleSave} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Save as Text File
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoverLetterGenerator;
