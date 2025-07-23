import { Home, BookOpen, FileText, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "subjects", label: "Subjects", icon: BookOpen },
    { id: "quiz", label: "Quiz", icon: FileText },
    { id: "summary", label: "Summary", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <nav className="bg-card border-b border-border px-6 py-3 shadow-sm">
      <div className="flex space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`flex items-center space-x-2 px-4 py-2 ${
                activeTab === item.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};