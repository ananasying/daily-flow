import { BookOpen, Heart, Briefcase, Leaf } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/diary", label: "Diary", icon: BookOpen },
  { path: "/healthy", label: "Healthy", icon: Heart },
  { path: "/business", label: "Business", icon: Briefcase },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-16 lg:w-56 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center justify-center lg:justify-start h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="hidden lg:block font-semibold text-sidebar-foreground">
            Bloom
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/diary" && location.pathname === "/");
          
          return (
            <NavLink key={item.path} to={item.path}>
              <Button
                variant={isActive ? "navActive" : "nav"}
                className={cn(
                  "w-full justify-center lg:justify-start gap-3",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="hidden lg:block">{item.label}</span>
              </Button>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="hidden lg:block text-xs text-muted-foreground text-center">
          Stay focused, stay calm
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
