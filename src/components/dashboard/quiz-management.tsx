import { useState } from "react";
import { FileText, Edit, Trash2, Plus, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Quiz {
  id: number;
  title: string;
  description?: string;
  duration: number;
  subject: string;
  chapter: string;
  questions: number;
  isActive: boolean;
  createdAt: string;
}

interface QuizManagementProps {
  quizzes: Quiz[];
  onEditQuiz: (quiz: Quiz) => void;
  onDeleteQuiz: (id: number) => void;
  onAddQuiz: () => void;
  onManageQuestions: (quizId: number) => void;
}

export const QuizManagement = ({ 
  quizzes, 
  onEditQuiz, 
  onDeleteQuiz, 
  onAddQuiz,
  onManageQuestions 
}: QuizManagementProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  
  const subjects = Array.from(new Set(quizzes.map(quiz => quiz.subject)));
  const filteredQuizzes = selectedSubject === "all" 
    ? quizzes 
    : quizzes.filter(quiz => quiz.subject === selectedSubject);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Quiz Management</h2>
          <p className="text-muted-foreground mt-1">Create and manage quizzes</p>
        </div>
        <Button onClick={onAddQuiz} className="bg-primary hover:bg-primary-dark">
          <Plus className="h-4 w-4 mr-2" />
          New Quiz
        </Button>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={selectedSubject === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedSubject("all")}
        >
          All Subjects
        </Button>
        {subjects.map((subject) => (
          <Button
            key={subject}
            variant={selectedSubject === subject ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSubject(subject)}
          >
            {subject}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <Card key={quiz.id} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="truncate">{quiz.title}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {quiz.subject}
                    </Badge>
                    <Badge 
                      variant={quiz.isActive ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {quiz.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditQuiz(quiz)}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteQuiz(quiz.id)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {quiz.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {quiz.description}
                </p>
              )}
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Chapter:</span>
                  <span className="font-medium">{quiz.chapter}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{quiz.duration} minutes</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-sm text-muted-foreground">
                  {quiz.questions} questions
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onManageQuestions(quiz.id)}
                  className="text-xs border-primary/20 text-primary hover:bg-primary/10"
                >
                  Manage Questions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredQuizzes.length === 0 && (
          <div className="col-span-full text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No quizzes found</p>
            <p className="text-muted-foreground mb-4">
              {selectedSubject === "all" 
                ? "Create your first quiz to get started" 
                : `No quizzes found for ${selectedSubject}`}
            </p>
            <Button onClick={onAddQuiz} className="bg-primary hover:bg-primary-dark">
              <Plus className="h-4 w-4 mr-2" />
              Create First Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};