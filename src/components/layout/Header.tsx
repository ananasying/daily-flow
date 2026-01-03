import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div>
        {title && (
          <h1 className="text-lg font-semibold text-foreground animate-fade-in">
            {title}
          </h1>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="iconSm"
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        
        <Avatar className="h-9 w-9 ring-2 ring-border cursor-pointer hover:ring-primary transition-all">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
          <AvatarFallback className="bg-sage-light text-sage-dark text-sm font-medium">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
