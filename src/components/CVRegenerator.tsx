
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobData } from "@/types/jobTypes";
import { useToast } from "@/components/ui/use-toast";
import { save } from "lucide-react";

interface CVRegeneratorProps {
  jobData: JobData | null;
}

const CVRegenerator = ({ jobData }: CVRegeneratorProps) => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState("preview");
  
  if (!jobData) return null;
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your tailored CV is being downloaded.",
    });
    // In a real extension, this would generate and download a PDF
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Tailored CV</CardTitle>
          <CardDescription>
            Your CV has been customized to highlight relevant skills and experience for this job.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="changes">Changes Made</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="space-y-4">
              <div className="border rounded-lg p-6 bg-white min-h-[400px]">
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h2 className="text-2xl font-bold">{jobData.cvData?.name || "Your Name"}</h2>
                    <p className="text-gray-600">{jobData.cvData?.title || "Software Developer"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {jobData.cvData?.highlightedSkills?.map((skill, i) => (
                        <div key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Experience</h3>
                    {jobData.cvData?.experience?.map((exp, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{exp.position}</span>
                          <span className="text-sm text-gray-500">{exp.period}</span>
                        </div>
                        <p className="text-sm mb-1">{exp.company}</p>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {exp.highlights.map((highlight, j) => (
                            <li key={j}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="changes">
              <div className="border rounded-lg p-6 space-y-4 min-h-[400px]">
                <div>
                  <h3 className="text-md font-medium mb-2">Highlighted Skills</h3>
                  <ul className="list-disc list-inside text-sm">
                    {jobData.cvData?.highlightedSkills?.map((skill, i) => (
                      <li key={i} className="text-green-700">{skill} <span className="text-gray-500 text-xs">- Relevant to job requirements</span></li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Emphasized Experience</h3>
                  <ul className="list-disc list-inside text-sm">
                    {jobData.cvData?.changes?.map((change, i) => (
                      <li key={i} className="text-blue-700">{change}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Project Description Tailoring</h3>
                  <p className="text-sm text-gray-700">
                    Project descriptions have been revised to highlight .NET and C# experience and emphasize relevant technical challenges similar to what might be expected in this role.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleDownload}>
            <save className="h-4 w-4 mr-2" />
            Download Tailored CV
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CVRegenerator;
