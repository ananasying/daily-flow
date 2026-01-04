import { useState } from "react";
import { BookOpen, Heart, Briefcase, Leaf, ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: LayoutDashboard },
  { path: "/diary", label: "Diary", icon: BookOpen },
  { path: "/healthy", label: "Healthy", icon: Heart },
  { path: "/business", label: "Business", icon: Briefcase },
];

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-56"
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-sidebar-foreground">
              Bloom
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink key={item.path} to={item.path}>
              <Button
                variant={isActive ? "navActive" : "nav"}
                className={cn(
                  "w-full gap-3",
                  isCollapsed ? "justify-center" : "justify-start",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground text-center">
            Stay focused, stay calm
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
