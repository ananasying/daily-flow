import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Plus, 
  Save, 
  Moon, 
  Info, 
  CheckSquare, 
  ListChecks,
  MessageSquare,
  Mic,
  MicOff,
  Sun
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItem {
  id: string;
  label: string;
  checked: boolean;
}

const initialTodos: TodoItem[] = [
  { id: "1", label: "Sport", checked: false },
  { id: "2", label: "Newsletter", checked: true },
  { id: "3", label: "Business", checked: false },
  { id: "4", label: "Write to friend", checked: false },
  { id: "5", label: "Communicate with husband", checked: false },
];

const Diary = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sleepTime, setSleepTime] = useState("22:00");
  const [wakeTime, setWakeTime] = useState("06:00");
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [whatIDone, setWhatIDone] = useState("");
  const [reflection, setReflection] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [showNewTodoInput, setShowNewTodoInput] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    ));
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { 
        id: Date.now().toString(), 
        label: newTodo.trim(), 
        checked: false 
      }]);
      setNewTodo("");
      setShowNewTodoInput(false);
    }
  };

  const handleSave = () => {
    console.log("Saving...", { date, sleepTime, wakeTime, todos, whatIDone, reflection });
    // Here you would save to backend
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording
    console.log(isRecording ? "Stopping recording..." : "Starting recording...");
  };

  // Calculate sleep duration
  const calculateSleepDuration = () => {
    const [sleepH, sleepM] = sleepTime.split(":").map(Number);
    const [wakeH, wakeM] = wakeTime.split(":").map(Number);
    
    let sleepMinutes = sleepH * 60 + sleepM;
    let wakeMinutes = wakeH * 60 + wakeM;
    
    if (wakeMinutes < sleepMinutes) {
      wakeMinutes += 24 * 60; // Add 24 hours if wake time is next day
    }
    
    const durationMinutes = wakeMinutes - sleepMinutes;
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <AppLayout title="Capture you. Digital you. Empowered you.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl">
        {/* Zone A: Calendar */}
        <Card className="animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg pointer-events-auto"
            />
          </CardContent>
        </Card>

        {/* Zone D: What I Done (Large, spans 2 rows on lg) */}
        <Card className="lg:col-span-2 lg:row-span-2 flex flex-col animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-primary" />
                What I Done
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="iconSm" className="text-muted-foreground">
                    <Info className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">
                    Track your accomplishments. What did you achieve today? 
                    List your completed tasks and activities.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent className="flex-1 pb-5">
            <Textarea
              placeholder="What did you accomplish today? List your achievements and completed activities..."
              value={whatIDone}
              onChange={(e) => setWhatIDone(e.target.value)}
              className="min-h-[200px] lg:min-h-[300px] resize-none border-0 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/50"
            />
          </CardContent>
        </Card>

        {/* Zone B: Bed Time */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Moon className="w-4 h-4 text-primary" />
              Bed Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Moon className="w-3 h-3" />
                  Go to bed
                </label>
                <Input
                  type="time"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  className="text-center font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Sun className="w-3 h-3" />
                  Wake up
                </label>
                <Input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="text-center font-medium"
                />
              </div>
            </div>
            <div className="pt-2 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total sleep</span>
                <span className="text-lg font-semibold text-primary">{calculateSleepDuration()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zone C: Todo List */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-primary" />
                Todo List
              </CardTitle>
              <Button 
                variant="ghost" 
                size="iconSm"
                onClick={() => setShowNewTodoInput(!showNewTodoInput)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {showNewTodoInput && (
              <div className="flex gap-2 mb-3 animate-fade-in">
                <Input
                  placeholder="New task..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTodo()}
                  className="flex-1"
                  autoFocus
                />
                <Button size="sm" onClick={addTodo}>Add</Button>
              </div>
            )}
            {todos.map((todo) => (
              <div 
                key={todo.id} 
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg transition-colors",
                  todo.checked && "bg-muted/50"
                )}
              >
                <Checkbox
                  id={todo.id}
                  checked={todo.checked}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <label
                  htmlFor={todo.id}
                  className={cn(
                    "text-sm cursor-pointer flex-1 transition-all",
                    todo.checked && "line-through text-muted-foreground"
                  )}
                >
                  {todo.label}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Zone E: Reflection of the day */}
        <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Reflection of the day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Reflect on your day... What went well? What could be better? Any insights or gratitude?"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="min-h-[100px] bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/50 resize-none"
            />
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3 z-50">
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size="lg"
          onClick={toggleRecording}
          className={cn(
            "rounded-full shadow-xl gap-2",
            isRecording && "animate-pulse"
          )}
        >
          {isRecording ? (
            <>
              <MicOff className="w-4 h-4" />
              Stop
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              Dictate
            </>
          )}
        </Button>
        <Button
          variant="floating"
          size="lg"
          onClick={handleSave}
          className="rounded-full shadow-xl gap-2"
        >
          <Save className="w-4 h-4" />
          Save
        </Button>
      </div>
    </AppLayout>
  );
};

export default Diary;
