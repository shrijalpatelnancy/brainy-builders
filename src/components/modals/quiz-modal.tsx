import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Quiz {
  id?: number;
  title: string;
  description?: string;
  duration: number;
  subjectId: number;
  chapterId: number;
  date?: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quiz: Quiz) => void;
  quiz?: Quiz | null;
  subjects: Array<{ id: number; name: string; chapters: Array<{ id: number; name: string }> }>;
}

export const QuizModal = ({ isOpen, onClose, onSave, quiz, subjects }: QuizModalProps) => {
  const [formData, setFormData] = useState<Quiz>({
    title: "",
    description: "",
    duration: 60,
    subjectId: 0,
    chapterId: 0,
    date: "",
  });

  const [selectedSubjectId, setSelectedSubjectId] = useState<number>(0);
  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

  useEffect(() => {
    if (quiz) {
      setFormData(quiz);
      setSelectedSubjectId(quiz.subjectId);
    } else {
      setFormData({
        title: "",
        description: "",
        duration: 60,
        subjectId: 0,
        chapterId: 0,
        date: "",
      });
      setSelectedSubjectId(0);
    }
  }, [quiz, isOpen]);

  const handleSave = () => {
    if (formData.title.trim() && formData.subjectId && formData.chapterId) {
      onSave(formData);
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      duration: 60,
      subjectId: 0,
      chapterId: 0,
      date: "",
    });
    setSelectedSubjectId(0);
    onClose();
  };

  const handleSubjectChange = (subjectId: string) => {
    const id = parseInt(subjectId);
    setSelectedSubjectId(id);
    setFormData({ ...formData, subjectId: id, chapterId: 0 });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-lg bg-card shadow-modal">
        <DialogHeader>
          <DialogTitle className="text-accent font-semibold">
            {quiz ? "Edit Quiz" : "New Quiz"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chapterId" className="text-sm font-medium text-foreground">
                Chapter ID:
              </Label>
              <Select
                value={formData.chapterId.toString()}
                onValueChange={(value) => setFormData({ ...formData, chapterId: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select chapter" />
                </SelectTrigger>
                <SelectContent>
                  {selectedSubject?.chapters.map((chapter) => (
                    <SelectItem key={chapter.id} value={chapter.id.toString()}>
                      {chapter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-foreground">
                Date:
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date || ""}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border-input focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-medium text-foreground">
              Duration:
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                placeholder="60"
                className="w-20 border-input focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">hh:mm</span>
            </div>
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