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
  Tv, 
  CheckSquare, 
  PenLine 
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
  const [bedTime, setBedTime] = useState("7");
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [reflection, setReflection] = useState("");
  const [watchedContent, setWatchedContent] = useState("");
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
    console.log("Saving...", { date, bedTime, todos, reflection, watchedContent });
    // Here you would save to backend
  };

  return (
    <AppLayout title="Daily Log">
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

        {/* Zone D: Reflection (Large, spans 2 rows on lg) */}
        <Card className="lg:col-span-2 lg:row-span-2 flex flex-col animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <PenLine className="w-4 h-4 text-primary" />
                Reflection of the day
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="iconSm" className="text-muted-foreground">
                    <Info className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">
                    Write freely about your day. What went well? 
                    What could be better? Any insights or gratitude?
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent className="flex-1 pb-5">
            <Textarea
              placeholder="How was your day? What are you grateful for? Any lessons learned?"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
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
          <CardContent>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min="0"
                max="24"
                value={bedTime}
                onChange={(e) => setBedTime(e.target.value)}
                className="w-20 text-center text-lg font-medium"
              />
              <span className="text-muted-foreground">hours slept</span>
            </div>
            <div className="mt-3 flex gap-2">
              {["6", "7", "8", "9"].map((hours) => (
                <Button
                  key={hours}
                  variant={bedTime === hours ? "sage" : "outline"}
                  size="sm"
                  onClick={() => setBedTime(hours)}
                  className="flex-1"
                >
                  {hours}h
                </Button>
              ))}
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

        {/* Zone E: Content Log */}
        <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Tv className="w-4 h-4 text-primary" />
              What I watched
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Movies, shows, videos, podcasts..."
              value={watchedContent}
              onChange={(e) => setWatchedContent(e.target.value)}
              className="bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/50"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Track your media consumption to stay mindful
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Floating Save Button */}
      <Button
        variant="floating"
        size="lg"
        onClick={handleSave}
        className="fixed bottom-6 right-6 rounded-full shadow-xl gap-2 z-50"
      >
        <Save className="w-4 h-4" />
        Save
      </Button>
    </AppLayout>
  );
};

export default Diary;
