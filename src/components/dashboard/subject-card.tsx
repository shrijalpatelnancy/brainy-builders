import { BookOpen, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Subject {
  id: number;
  name: string;
  description?: string;
  chapters: Array<{
    id: number;
    name: string;
    description?: string;
  }>;
}

interface SubjectCardProps {
  subject: Subject;
  onEditSubject: (subject: Subject) => void;
  onDeleteSubject: (id: number) => void;
  onAddChapter: (subjectId: number) => void;
  onEditChapter: (chapter: any, subjectId: number) => void;
}

export const SubjectCard = ({ 
  subject, 
  onEditSubject, 
  onDeleteSubject, 
  onAddChapter,
  onEditChapter 
}: SubjectCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>{subject.name}</span>
          </CardTitle>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditSubject(subject)}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteSubject(subject.id)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {subject.description && (
          <p className="text-sm text-muted-foreground mt-1">{subject.description}</p>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">Chapters</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddChapter(subject.id)}
              className="h-7 px-2 text-xs border-primary/20 text-primary hover:bg-primary/10"
            >
              <Plus className="h-3 w-3 mr-1" />
              Chapter
            </Button>
          </div>
          
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {subject.chapters.map((chapter) => (
              <div 
                key={chapter.id}
                className="flex items-center justify-between p-2 rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {chapter.name}
                  </p>
                  {chapter.description && (
                    <p className="text-xs text-muted-foreground truncate">
                      {chapter.description}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditChapter(chapter, subject.id)}
                  className="h-6 w-6 p-0 ml-2 hover:bg-primary/10"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            ))}
            
            {subject.chapters.length === 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">No chapters yet</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{subject.chapters.length} chapters</span>
            <span>Edit/Delete</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};