import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Subject {
  id?: number;
  name: string;
  description?: string;
}

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subject: Subject) => void;
  subject?: Subject | null;
}

export const SubjectModal = ({ isOpen, onClose, onSave, subject }: SubjectModalProps) => {
  const [formData, setFormData] = useState<Subject>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (subject) {
      setFormData(subject);
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [subject, isOpen]);

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData);
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", description: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md bg-card shadow-modal">
        <DialogHeader>
          <DialogTitle className="text-accent font-semibold">
            {subject ? "Edit Subject" : "New Subject"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Name:
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter subject name"
              className="border-input focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Description:
            </Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter subject description (optional)"
              className="border-input focus:ring-primary min-h-20"
            />
          </div>
          
          <div className="text-xs text-muted-foreground italic">
            Note: may include more input fields....
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4 border-t border-border/50">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};