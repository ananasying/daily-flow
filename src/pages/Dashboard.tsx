import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Quote, Newspaper } from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl">
        {/* Newsletter - Large Left Card */}
        <Card className="lg:col-span-2 lg:row-span-2 flex flex-col">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-sage-dark" />
            </div>
            <CardTitle className="text-lg">Newsletter</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p className="text-foreground font-medium">
                Today's Focus: Building Better Habits
              </p>
              <p>
                The key to lasting change isn't willpower—it's designing your environment 
                to make good habits inevitable and bad habits impossible. Start small: 
                place your running shoes by your bed, keep healthy snacks at eye level, 
                and remove friction from the actions you want to take.
              </p>
              <p>
                Remember, every expert was once a beginner. The difference between those 
                who succeed and those who don't isn't talent—it's consistency. Show up 
                every day, even when you don't feel like it, especially when you don't 
                feel like it.
              </p>
              <p>
                This week, try the "2-minute rule": If something takes less than 2 minutes, 
                do it now. You'll be amazed at how much you accomplish.
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Published today • 3 min read
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sport / Health Tips */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
            </div>
            <CardTitle>Health Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Movement breaks</span> 
              {" "}are essential. Every 30 minutes, stand up, stretch, and take a 
              short walk. Your body will thank you, and your focus will improve.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              AI-powered insight
            </div>
          </CardContent>
        </Card>

        {/* Famous Quotes */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Quote className="w-5 h-5 text-muted-foreground" />
            </div>
            <CardTitle>Daily Quote</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-2 border-primary pl-4 italic text-foreground">
              "The only way to do great work is to love what you do."
            </blockquote>
            <p className="mt-3 text-sm text-muted-foreground text-right">
              — Steve Jobs
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
