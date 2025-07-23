import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-foreground">Administrator</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search users/subjects/quizzes..."
              className="pl-10 w-80"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary/10">
            <User className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Welcome Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};