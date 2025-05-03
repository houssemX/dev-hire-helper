
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUserCV } from "@/hooks/useUserCV";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearUserData } = useUserCV();
  
  const handleClear = () => {
    clearUserData();
    setIsOpen(false);
  };
  
  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-8">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-500 max-w-4xl">
        <div>© 2025 Dev Hire Helper</div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="text-gray-500 hover:text-gray-800">
              Reset Data
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clear all data?</DialogTitle>
              <DialogDescription>
                This will delete your CV and all saved job data. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleClear}>Clear Data</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
};

export default Footer;
