
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { JobData } from "@/types/jobTypes";

interface JobSummaryProps {
  jobData: JobData | null;
}

const JobSummary = ({ jobData }: JobSummaryProps) => {
  const { toast } = useToast();
  
  if (!jobData) return null;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The summary has been copied to your clipboard.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Job Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{jobData.summary}</p>
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => copyToClipboard(jobData.summary)}
              className="flex items-center gap-1 text-xs"
            >
              <copy className="h-3 w-3" />
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Required Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {jobData.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Key Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 list-disc list-inside text-gray-700">
              {jobData.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Company & Role Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Company</p>
                <p>{jobData.company}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p>{jobData.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Job Type</p>
                <p>{jobData.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Experience Level</p>
                <p>{jobData.experienceLevel}</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm font-medium text-gray-500">Language</p>
              <p>{jobData.language}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobSummary;
