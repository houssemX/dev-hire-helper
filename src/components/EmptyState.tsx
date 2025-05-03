
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EmptyState = () => {
  return (
    <Card className="w-full border-dashed">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-700">Ready to Analyze a Job Offer</CardTitle>
        <CardDescription className="text-center">
          Navigate to a job posting page and click the "Analyze This Page" button in the header.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-10">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="rounded-full bg-blue-100 p-6">
            <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="max-w-xs">
            <h3 className="text-lg font-medium text-gray-900">How to use:</h3>
            <ol className="mt-2 text-sm text-gray-500 list-decimal list-inside text-left space-y-1">
              <li>Navigate to a .NET or C# job offer page</li>
              <li>Click "Analyze This Page" in the header</li>
              <li>Review the job summary and technologies</li>
              <li>Generate email, cover letter and tailored CV</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
