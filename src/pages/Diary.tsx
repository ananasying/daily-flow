import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import JournalEntry from "@/components/diary/JournalEntry";
import { 
  Plus, 
  Save, 
  Moon, 
  CheckSquare, 
  ListChecks,
  MessageSquare,
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
  };

  // Calculate sleep duration
  const calculateSleepDuration = () => {
    const [sleepH, sleepM] = sleepTime.split(":").map(Number);
    const [wakeH, wakeM] = wakeTime.split(":").map(Number);
    
    let sleepMinutes = sleepH * 60 + sleepM;
    let wakeMinutes = wakeH * 60 + wakeM;
    
    if (wakeMinutes < sleepMinutes) {
      wakeMinutes += 24 * 60;
    }
    
    const durationMinutes = wakeMinutes - sleepMinutes;
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <AppLayout title="Capture you. Digital you. Empowered you.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl">
        {/* Left Column: Calendar, Bedtime, Todo */}
        <div className="space-y-5">
          {/* Calendar */}
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

          {/* Bed Time */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
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

          {/* Todo List */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
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
        </div>

        {/* Right Column: Journal Entries */}
        <div className="space-y-5">
          <JournalEntry
            title="What I Done"
            icon={ListChecks}
            placeholder="What did you accomplish today? List your achievements and completed activities..."
            value={whatIDone}
            onChange={setWhatIDone}
            tooltip="Track your accomplishments. What did you achieve today?"
            style={{ animationDelay: "0.05s" }}
            className="h-[200px]"
          />

          <JournalEntry
            title="Reflection of the day"
            icon={MessageSquare}
            placeholder="Reflect on your day... What went well? What could be better? Any insights or gratitude?"
            value={reflection}
            onChange={setReflection}
            style={{ animationDelay: "0.1s" }}
          />
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 z-50">
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
