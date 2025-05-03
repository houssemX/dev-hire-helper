
// This script would be injected into the page to analyze job content
// In a real extension, this would extract and analyze the job details

console.log('Job Analyzer content script loaded');

function extractJobDetails() {
  // This function would use selectors or AI to extract job information
  // For demonstration purposes, we'll return a simple detection result
  
  const pageText = document.body.innerText.toLowerCase();
  const isDotNetJob = pageText.includes('.net') || 
                     pageText.includes('c#') || 
                     pageText.includes('asp.net') ||
                     pageText.includes('dotnet');
  
  return {
    isDotNetJob,
    pageTitle: document.title,
    url: window.location.href
  };
}

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyzeJob") {
    const jobDetails = extractJobDetails();
    sendResponse(jobDetails);
  }
  return true;
});
