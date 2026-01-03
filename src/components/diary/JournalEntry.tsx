import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info, LucideIcon } from "lucide-react";

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
      <CardContent className="flex-1 pb-5">
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-full min-h-[180px] resize-none border-0 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/50"
        />
      </CardContent>
    </Card>
  );
};

export default JournalEntry;
