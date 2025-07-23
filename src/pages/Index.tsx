import { useState } from "react";
import { Plus, BookOpen, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Navigation } from "@/components/ui/navigation";
import { SubjectCard } from "@/components/dashboard/subject-card";
import { QuizManagement } from "@/components/dashboard/quiz-management";
import { SubjectModal } from "@/components/modals/subject-modal";
import { ChapterModal } from "@/components/modals/chapter-modal";
import { QuizModal } from "@/components/modals/quiz-modal";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app this would come from API
const mockSubjects = [
  {
    id: 1,
    name: "Physics",
    description: "Classical and modern physics concepts",
    chapters: [
      { id: 1, name: "Force", description: "Newton's laws and mechanics" },
      { id: 2, name: "EMF", description: "Electromagnetic fields" },
    ]
  },
  {
    id: 2,
    name: "App Dev-I",
    description: "Introduction to application development",
    chapters: [
      { id: 3, name: "HTML", description: "Hypertext Markup Language" },
      { id: 4, name: "CSS", description: "Cascading Style Sheets" },
    ]
  }
];

const mockQuizzes = [
  {
    id: 1,
    title: "Quiz1(CSS)",
    description: "Test your CSS knowledge",
    duration: 45,
    subject: "App Dev-I",
    chapter: "CSS",
    questions: 12,
    isActive: true,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Quiz2(HTML)",
    description: "HTML fundamentals quiz",
    duration: 30,
    subject: "App Dev-I", 
    chapter: "HTML",
    questions: 8,
    isActive: true,
    createdAt: "2024-01-10"
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [subjects, setSubjects] = useState(mockSubjects);
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  
  // Modal states
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [editingChapter, setEditingChapter] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const handleAddSubject = () => {
    setEditingSubject(null);
    setIsSubjectModalOpen(true);
  };

  const handleEditSubject = (subject: any) => {
    setEditingSubject(subject);
    setIsSubjectModalOpen(true);
  };

  const handleSaveSubject = (subjectData: any) => {
    if (editingSubject) {
      setSubjects(subjects.map(s => s.id === editingSubject.id ? { ...s, ...subjectData } : s));
      toast({ title: "Subject updated successfully" });
    } else {
      const newSubject = { ...subjectData, id: Date.now(), chapters: [] };
      setSubjects([...subjects, newSubject]);
      toast({ title: "Subject created successfully" });
    }
  };

  const handleDeleteSubject = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id));
    toast({ title: "Subject deleted successfully", variant: "destructive" });
  };

  const handleAddChapter = (subjectId: number) => {
    setSelectedSubjectId(subjectId);
    setEditingChapter(null);
    setIsChapterModalOpen(true);
  };

  const handleEditChapter = (chapter: any, subjectId: number) => {
    setSelectedSubjectId(subjectId);
    setEditingChapter(chapter);
    setIsChapterModalOpen(true);
  };

  const handleSaveChapter = (chapterData: any) => {
    if (editingChapter) {
      setSubjects(subjects.map(s => 
        s.id === selectedSubjectId 
          ? { 
              ...s, 
              chapters: s.chapters.map(c => 
                c.id === editingChapter.id ? { ...c, ...chapterData } : c
              ) 
            }
          : s
      ));
      toast({ title: "Chapter updated successfully" });
    } else {
      const newChapter = { ...chapterData, id: Date.now() };
      setSubjects(subjects.map(s => 
        s.id === selectedSubjectId 
          ? { ...s, chapters: [...s.chapters, newChapter] }
          : s
      ));
      toast({ title: "Chapter created successfully" });
    }
  };

  const handleAddQuiz = () => {
    setEditingQuiz(null);
    setIsQuizModalOpen(true);
  };

  const handleEditQuiz = (quiz: any) => {
    setEditingQuiz(quiz);
    setIsQuizModalOpen(true);
  };

  const handleSaveQuiz = (quizData: any) => {
    if (editingQuiz) {
      setQuizzes(quizzes.map(q => q.id === editingQuiz.id ? { ...q, ...quizData } : q));
      toast({ title: "Quiz updated successfully" });
    } else {
      const newQuiz = { 
        ...quizData, 
        id: Date.now(), 
        questions: 0, 
        isActive: true, 
        createdAt: new Date().toISOString().split('T')[0] 
      };
      setQuizzes([...quizzes, newQuiz]);
      toast({ title: "Quiz created successfully" });
    }
  };

  const handleDeleteQuiz = (id: number) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
    toast({ title: "Quiz deleted successfully", variant: "destructive" });
  };

  const handleManageQuestions = (quizId: number) => {
    toast({ title: "Question management will be implemented next" });
  };

  const renderDashboard = () => {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-primary text-primary-foreground shadow-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Total Subjects</p>
                  <p className="text-3xl font-bold">{subjects.length}</p>
                </div>
                <BookOpen className="h-10 w-10 text-primary-foreground/80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Quizzes</p>
                  <p className="text-3xl font-bold text-foreground">{quizzes.length}</p>
                </div>
                <FileText className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Quizzes</p>
                  <p className="text-3xl font-bold text-foreground">
                    {quizzes.filter(q => q.isActive).length}
                  </p>
                </div>
                <BarChart3 className="h-10 w-10 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
              <p className="text-muted-foreground mt-1">Manage subjects, chapters, and quizzes</p>
            </div>
            <Button onClick={handleAddSubject} className="bg-primary hover:bg-primary-dark">
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground mb-4">
            All subjects here ...
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onEditSubject={handleEditSubject}
                onDeleteSubject={handleDeleteSubject}
                onAddChapter={handleAddChapter}
                onEditChapter={handleEditChapter}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "quiz":
        return (
          <QuizManagement
            quizzes={quizzes}
            onEditQuiz={handleEditQuiz}
            onDeleteQuiz={handleDeleteQuiz}
            onAddQuiz={handleAddQuiz}
            onManageQuestions={handleManageQuestions}
          />
        );
      case "summary":
        return (
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Summary Charts</h2>
            <p className="text-muted-foreground">Analytics and reporting will be implemented here</p>
          </div>
        );
      case "users":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">User Management</h2>
            <p className="text-muted-foreground">User administration will be implemented here</p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>

      <SubjectModal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        onSave={handleSaveSubject}
        subject={editingSubject}
      />

      <ChapterModal
        isOpen={isChapterModalOpen}
        onClose={() => setIsChapterModalOpen(false)}
        onSave={handleSaveChapter}
        chapter={editingChapter}
      />

      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onSave={handleSaveQuiz}
        quiz={editingQuiz}
        subjects={subjects}
      />
    </div>
  );
};

export default Index;