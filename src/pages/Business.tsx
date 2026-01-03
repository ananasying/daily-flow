import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, TrendingUp, Target, Clock } from "lucide-react";

const Business = () => {
  return (
    <AppLayout title="Business & Goals">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        <Card className="animate-fade-in">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
              <Target className="w-5 h-5 text-sage-dark" />
            </div>
            <CardTitle>Monthly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">3/5</div>
            <p className="text-sm text-muted-foreground mt-1">
              Goals completed
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent-foreground" />
            </div>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">67%</div>
            <p className="text-sm text-muted-foreground mt-1">
              This quarter
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <CardTitle>Focus Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">4.5h</div>
            <p className="text-sm text-muted-foreground mt-1">
              Deep work today
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-sage-dark" />
            </div>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Business tracking features are being developed. Soon you'll be able to 
              manage projects, track time, set OKRs, and monitor your professional growth.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Business;
