import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Loader2 } from "lucide-react";

interface ImproveSuggestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suggestions: string[];
  isLoading: boolean;
  onSelectSuggestion: (suggestion: string) => void;
}

const ImproveSuggestionsDialog = ({
  open,
  onOpenChange,
  suggestions,
  isLoading,
  onSelectSuggestion,
}: ImproveSuggestionsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Improved Suggestions</DialogTitle>
          <DialogDescription>
            Select a suggestion to replace your text
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Improving your text...</span>
          </div>
        ) : suggestions.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No suggestions available. Try writing more text first.
          </div>
        ) : (
          <ScrollArea className="max-h-[300px]">
            <div className="space-y-2 pr-4">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSelectSuggestion(suggestion)}
                  className="w-full text-left p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-start gap-2">
                    <span className="flex-1 text-sm">{suggestion}</span>
                    <Check className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImproveSuggestionsDialog;
