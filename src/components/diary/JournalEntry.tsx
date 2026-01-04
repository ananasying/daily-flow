import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info, LucideIcon, Mic, MicOff, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImproveSuggestionsDialog from "./ImproveSuggestionsDialog";

interface JournalEntryProps {
  title: string;
  icon: LucideIcon;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  tooltip?: string;
  className?: string;
  style?: React.CSSProperties;
}

const JournalEntry = ({
  title,
  icon: Icon,
  placeholder,
  value,
  onChange,
  tooltip,
  className = "",
  style,
}: JournalEntryProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? "Stopping recording..." : "Starting recording...");
  };

  const handleImprove = async () => {
    if (!value.trim()) {
      toast({
        title: "No text to improve",
        description: "Please write something first.",
        variant: "destructive",
      });
      return;
    }

    setIsImproving(true);
    setShowSuggestions(true);
    setSuggestions([]);

    try {
      const { data, error } = await supabase.functions.invoke('improve-text', {
        body: { text: value },
      });

      if (error) throw error;

      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error improving text:', error);
      toast({
        title: "Failed to improve text",
        description: "Please try again later.",
        variant: "destructive",
      });
      setShowSuggestions(false);
    } finally {
      setIsImproving(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    toast({
      title: "Text updated",
      description: "Your text has been replaced with the selected suggestion.",
    });
  };

  return (
    <Card className={`flex flex-col h-full animate-fade-in ${className}`} style={style}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Icon className="w-4 h-4 text-primary" />
            {title}
          </CardTitle>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="iconSm" className="text-muted-foreground">
                  <Info className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4 flex flex-col">
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-h-[32px] resize-none border-0 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/50"
        />
        <div className="flex justify-end gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleImprove}
            disabled={isImproving || !value.trim()}
            className="gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Improve
          </Button>
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={toggleRecording}
            className={cn(
              "gap-2",
              isRecording && "animate-pulse"
            )}
          >
            {isRecording ? (
              <>
                <MicOff className="w-3.5 h-3.5" />
                Stop
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5" />
                Dictate
              </>
            )}
          </Button>
        </div>
      </CardContent>

      <ImproveSuggestionsDialog
        open={showSuggestions}
        onOpenChange={setShowSuggestions}
        suggestions={suggestions}
        isLoading={isImproving}
        onSelectSuggestion={handleSelectSuggestion}
      />
    </Card>
  );
};

export default JournalEntry;
