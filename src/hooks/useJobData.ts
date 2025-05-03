
import { useState, useEffect } from "react";
import { JobData } from "@/types/jobTypes";
import { useUserCV } from "./useUserCV";

export const useJobData = () => {
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [isJobDetected, setIsJobDetected] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { userCV } = useUserCV();
  
  // Check local storage for saved job data on initial load
  useEffect(() => {
    const savedJobData = localStorage.getItem('job_data');
    if (savedJobData) {
      try {
        setJobData(JSON.parse(savedJobData));
        setIsJobDetected(true);
      } catch (error) {
        console.error("Error parsing saved job data:", error);
      }
    }
  }, []);
  
  // This would be replaced with actual content extraction and AI analysis
  const analyzeCurrentPage = async () => {
    if (!userCV) {
      console.error("No CV uploaded. Cannot analyze job without CV data.");
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // In a real extension, this would:
      // 1. Get the current tab's HTML using chrome.tabs.executeScript
      // 2. Extract job details using an AI service or regex patterns
      // 3. Process and return structured data
      
      // Mock implementation with timeout to simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sample mock data - this would be dynamically generated
      const mockJobData: JobData = {
        title: "Senior .NET Developer",
        company: "TechCorp Solutions",
        location: "Paris, France",
        language: "French",
        type: "Full-time",
        experienceLevel: "5+ years",
        summary: "TechCorp is seeking an experienced .NET Developer proficient in C# to join our growing team. The ideal candidate will have strong experience with ASP.NET Core, SQL Server, and cloud services. You'll be working on mission-critical financial applications that serve thousands of clients.",
        technologies: [
          "C#", ".NET Core", "ASP.NET MVC", "SQL Server", "Entity Framework", 
          "Azure", "REST APIs", "JavaScript", "Git"
        ],
        requirements: [
          "5+ years of experience in .NET development",
          "Strong knowledge of C# and object-oriented design",
          "Experience with SQL Server and database design",
          "Familiarity with Agile methodologies",
          "Fluency in French and English"
        ],
        emailSubject: `Application for Senior .NET Developer position at TechCorp Solutions - ${userCV.name}`,
        emailBody: `Bonjour,\n\nJe vous soumets ma candidature pour le poste de Senior .NET Developer chez TechCorp Solutions.\n\nAvec plus de ${userCV.yearsOfExperience} ans d'expérience en développement C# et .NET, je possède les compétences techniques et l'expertise recherchées pour ce rôle. J'ai notamment travaillé sur des projets similaires dans le secteur financier avec des technologies comme ASP.NET Core, SQL Server et Azure.\n\nVeuillez trouver ci-joint mon CV détaillant mon expérience pertinente. Je serais ravi de discuter de ma candidature plus en détail lors d'un entretien.\n\nCordialement,\n${userCV.name}\n${userCV.phone}\n${userCV.email}`,
        coverLetter: generateCoverLetter(userCV, "French"),
        cvData: {
          name: userCV.name,
          title: userCV.title,
          highlightedSkills: [
            "C#", ".NET Core", "ASP.NET MVC", "SQL Server", "Entity Framework", 
            "REST APIs", "Agile Methodologies"
          ],
          experience: userCV.experience.map(exp => ({
            ...exp,
            highlights: exp.highlights.map(h => h.includes(".NET") || h.includes("C#") ? `**${h}**` : h)
          })),
          changes: [
            "Repositioned .NET and C# experience to be more prominent",
            "Emphasized cloud deployment experience with Azure",
            "Highlighted financial sector projects"
          ]
        }
      };
      
      setJobData(mockJobData);
      setIsJobDetected(true);
      
      // Save to localStorage for persistence
      localStorage.setItem('job_data', JSON.stringify(mockJobData));
      
    } catch (error) {
      console.error("Error analyzing job data:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Helper function to generate a mock cover letter based on CV data
  function generateCoverLetter(cv: any, language: string) {
    if (language === "French") {
      return `Paris, le ${new Date().toLocaleDateString('fr-FR')}\n\nObjet : Candidature pour le poste de Senior .NET Developer\n\nMadame, Monsieur,\n\nJe me permets de vous soumettre ma candidature pour le poste de Senior .NET Developer au sein de TechCorp Solutions.\n\nActuellement ${cv.title} chez ${cv.experience[0].company}, j'ai développé une expertise approfondie dans le développement d'applications avec le framework .NET et le langage C#. Mon expérience de ${cv.yearsOfExperience} ans dans ce domaine m'a permis de maîtriser les technologies ASP.NET Core, SQL Server et Azure, qui sont essentielles pour ce poste.\n\nAu cours de ma carrière, j'ai eu l'opportunité de travailler sur des projets similaires à ceux mentionnés dans votre offre d'emploi. Par exemple, j'ai participé au développement d'une application financière sécurisée utilisant .NET Core et Entity Framework, qui a permis d'améliorer l'efficacité opérationnelle de 30%.\n\nJe suis particulièrement intéressé par le poste proposé car il correspond parfaitement à mes compétences techniques et à mon désir de relever de nouveaux défis dans un environnement innovant comme le vôtre.\n\nJe serais ravi de pouvoir vous rencontrer afin de discuter plus en détail de ma candidature et de la façon dont je pourrais contribuer au succès de votre entreprise.\n\nJe vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.\n\n${cv.name}`;
    } else {
      return `${new Date().toLocaleDateString('en-US')}\n\nSubject: Application for Senior .NET Developer position\n\nDear Hiring Manager,\n\nI am writing to express my interest in the Senior .NET Developer position at TechCorp Solutions. With ${cv.yearsOfExperience} years of experience in .NET development and a strong background in C#, I believe I am an ideal candidate for this role.\n\nCurrently serving as a ${cv.title} at ${cv.experience[0].company}, I have developed extensive expertise in building robust applications using .NET Core, ASP.NET MVC, and SQL Server. I have successfully delivered multiple projects similar to those mentioned in your job description, including a secure financial application that improved operational efficiency by 30%.\n\nI am particularly drawn to this opportunity because it aligns perfectly with my technical skills and my desire to take on new challenges in an innovative environment like yours.\n\nI would welcome the opportunity to discuss my application further and demonstrate how my skills and experience could benefit your team.\n\nThank you for considering my application.\n\nSincerely,\n${cv.name}`;
    }
  }
  
  return {
    jobData,
    isJobDetected,
    isAnalyzing,
    analyzeCurrentPage
  };
};
