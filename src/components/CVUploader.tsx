
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { upload } from "lucide-react";

interface CVUploaderProps {
  onUpload: (file: File) => void;
}

const CVUploader = ({ onUpload }: CVUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isPdfOrDocx(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isPdfOrDocx(file)) {
        setSelectedFile(file);
      }
    }
  };

  const isPdfOrDocx = (file: File) => {
    return file.type === "application/pdf" || 
           file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-700">Upload Your CV</CardTitle>
        <CardDescription className="text-center">
          Upload your CV in PDF or Word format. We'll analyze it to help personalize your job applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } transition-colors duration-200`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx"
            className="hidden"
          />
          <upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-500 mb-2">
            Drag and drop your CV here, or{" "}
            <button
              className="text-blue-600 hover:text-blue-800 underline"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              browse files
            </button>
          </p>
          <p className="text-xs text-gray-400">Supported formats: PDF, DOCX</p>
          {selectedFile && (
            <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-2 rounded">
              Selected: {selectedFile.name}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile}
          className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
        >
          Upload and Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CVUploader;
