import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Apple, Droplets } from "lucide-react";

const Healthy = () => {
  return (
    <AppLayout title="Health & Wellness">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        <Card className="animate-fade-in">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
              <Heart className="w-5 h-5 text-sage-dark" />
            </div>
            <CardTitle>Wellness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">85%</div>
            <p className="text-sm text-muted-foreground mt-1">
              You're doing great this week!
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Activity className="w-5 h-5 text-accent-foreground" />
            </div>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">4,532</div>
            <p className="text-sm text-muted-foreground mt-1">
              Steps today
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Droplets className="w-5 h-5 text-muted-foreground" />
            </div>
            <CardTitle>Hydration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">6/8</div>
            <p className="text-sm text-muted-foreground mt-1">
              Glasses of water
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
              <Apple className="w-5 h-5 text-sage-dark" />
            </div>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Health tracking features are being developed. Soon you'll be able to 
              track nutrition, exercise routines, sleep patterns, and more.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Healthy;
