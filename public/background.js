
chrome.runtime.onInstalled.addListener(() => {
  console.log('Dev Hire Helper extension installed');
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyzeCurrentPage") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: getPageContent
      }, (results) => {
        if (chrome.runtime.lastError) {
          sendResponse({ error: chrome.runtime.lastError });
          return;
        }
        
        if (!results || !results[0]) {
          sendResponse({ error: "Failed to get page content" });
          return;
        }
        
        // Send the page content back to the popup
        sendResponse({ pageContent: results[0].result });
      });
    });
    
    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
});

// Function to be executed in the context of the page
function getPageContent() {
  return document.body.innerText;
}
