
import { useState, useEffect } from "react";

type Experience = {
  company: string;
  position: string;
  period: string;
  highlights: string[];
};

type UserCV = {
  name: string;
  email: string;
  phone: string;
  title: string;
  yearsOfExperience: number;
  skills: string[];
  experience: Experience[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
};

export const useUserCV = () => {
  const [userCV, setUserCV] = useState<UserCV | null>(null);
  const [hasCV, setHasCV] = useState(false);
  
  // Check local storage for saved CV data on initial load
  useEffect(() => {
    const savedCV = localStorage.getItem('user_cv');
    if (savedCV) {
      try {
        setUserCV(JSON.parse(savedCV));
        setHasCV(true);
      } catch (error) {
        console.error("Error parsing saved CV data:", error);
      }
    }
  }, []);
  
  const uploadCV = async (file: File) => {
    // In a real extension, this would:
    // 1. Parse PDF/DOCX using a library or service
    // 2. Extract structured data from the CV
    // 3. Store the parsed data
    
    // Mock implementation with fake data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // This is sample mock data - in reality, we'd extract this from the file
    const mockCV: UserCV = {
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      phone: "+33 6 12 34 56 78",
      title: "Senior Software Developer",
      yearsOfExperience: 7,
      skills: [
        "C#", ".NET Core", "ASP.NET MVC", "SQL Server", "Entity Framework",
        "Azure", "REST APIs", "JavaScript", "TypeScript", "React", "Git"
      ],
      experience: [
        {
          company: "Tech Innovators",
          position: "Senior .NET Developer",
          period: "2019 - Present",
          highlights: [
            "Developed and maintained large-scale financial applications using .NET Core and C#",
            "Implemented CI/CD pipelines using Azure DevOps",
            "Reduced application load time by 40% through database optimization",
            "Led a team of 5 developers for a major system migration project"
          ]
        },
        {
          company: "Digital Solutions Corp",
          position: ".NET Developer",
          period: "2016 - 2019",
          highlights: [
            "Built RESTful APIs using ASP.NET Web API",
            "Designed and implemented database schemas using SQL Server",
            "Developed front-end interfaces using React and TypeScript",
            "Participated in Agile development processes"
          ]
        }
      ],
      education: [
        {
          institution: "Université Paris-Saclay",
          degree: "Master en Informatique",
          year: "2016"
        }
      ],
      languages: [
        { name: "French", level: "Native" },
        { name: "English", level: "Fluent" }
      ]
    };
    
    setUserCV(mockCV);
    setHasCV(true);
    localStorage.setItem('user_cv', JSON.stringify(mockCV));
  };
  
  const clearUserData = () => {
    localStorage.removeItem('user_cv');
    localStorage.removeItem('job_data');
    setUserCV(null);
    setHasCV(false);
    window.location.reload();
  };
  
  return {
    userCV,
    hasCV,
    uploadCV,
    clearUserData
  };
};
