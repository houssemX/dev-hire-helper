
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useJobData } from "@/hooks/useJobData";

const Header = () => {
  const { toast } = useToast();
  const { analyzeCurrentPage, isAnalyzing } = useJobData();
  
  const handleAnalyzeClick = async () => {
    try {
      await analyzeCurrentPage();
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Failed to analyze the current page. Please make sure you are on a job offer page.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center max-w-4xl">
        <div className="flex items-center space-x-2">
          <Mail className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-blue-700">Dev Hire Helper</h1>
        </div>
        <Button 
          onClick={handleAnalyzeClick} 
          disabled={isAnalyzing}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze This Page"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
