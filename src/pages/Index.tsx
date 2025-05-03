
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import CVUploader from "@/components/CVUploader";
import JobSummary from "@/components/JobSummary";
import EmailGenerator from "@/components/EmailGenerator";
import CoverLetterGenerator from "@/components/CoverLetterGenerator";
import CVRegenerator from "@/components/CVRegenerator";
import { useJobData } from "@/hooks/useJobData";
import { useUserCV } from "@/hooks/useUserCV";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const { toast } = useToast();
  const { jobData, isJobDetected, isAnalyzing } = useJobData();
  const { hasCV, uploadCV } = useUserCV();

  const handleCVUpload = async (file: File) => {
    try {
      await uploadCV(file);
      toast({
        title: "CV uploaded successfully",
        description: "Your CV has been parsed and saved for future use.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your CV. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 max-w-4xl">
        {!hasCV ? (
          <CVUploader onUpload={handleCVUpload} />
        ) : !isJobDetected && !isAnalyzing ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {isAnalyzing ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-lg font-medium text-gray-700">Analyzing job offer...</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-700">{jobData?.title || "Job Offer"}</CardTitle>
                    <CardDescription>{jobData?.company || "Company"}</CardDescription>
                  </CardHeader>
                </Card>
                
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="cover">Cover Letter</TabsTrigger>
                    <TabsTrigger value="cv">Tailored CV</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary">
                    <JobSummary jobData={jobData} />
                  </TabsContent>
                  
                  <TabsContent value="email">
                    <EmailGenerator jobData={jobData} />
                  </TabsContent>
                  
                  <TabsContent value="cover">
                    <CoverLetterGenerator jobData={jobData} />
                  </TabsContent>
                  
                  <TabsContent value="cv">
                    <CVRegenerator jobData={jobData} />
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
