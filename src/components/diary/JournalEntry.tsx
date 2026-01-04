import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info, LucideIcon, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? "Stopping recording..." : "Starting recording...");
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
        <div className="flex justify-end mt-3">
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
    </Card>
  );
};

export default JournalEntry;
