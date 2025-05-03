
export interface JobData {
  title: string;
  company: string;
  location: string;
  language: string;
  type: string;
  experienceLevel: string;
  summary: string;
  technologies: string[];
  requirements: string[];
  emailSubject: string;
  emailBody: string;
  coverLetter: string;
  cvData: {
    name: string;
    title: string;
    highlightedSkills: string[];
    experience: {
      company: string;
      position: string;
      period: string;
      highlights: string[];
    }[];
    changes: string[];
  };
}
