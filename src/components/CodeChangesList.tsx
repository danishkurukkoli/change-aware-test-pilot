
import React from 'react';
import { CodeChange } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { FileCode, User, ChevronRight, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CodeChangesListProps {
  codeChanges: CodeChange[];
  isLoading: boolean;
}

export const CodeChangesList: React.FC<CodeChangesListProps> = ({ codeChanges, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start p-4 border rounded-md">
            <Skeleton className="h-10 w-10 mr-4 rounded-md" />
            <div className="flex-1">
              <Skeleton className="h-5 w-full max-w-[250px] mb-2" />
              <Skeleton className="h-4 w-full max-w-[400px] mb-2" />
              <div className="flex space-x-2 mt-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {codeChanges.map((change) => {
        const isHighComplexity = change.complexity > 0.7;
        const isLargeChange = change.changedLines > 50;
        
        return (
          <div key={change.id} className="flex items-start p-4 border rounded-md hover:bg-muted/50 transition-colors">
            <div className="h-10 w-10 mr-4 bg-primary/10 rounded-md flex items-center justify-center text-primary">
              <FileCode size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{change.fileName}</h3>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(change.timestamp), { addSuffix: true })}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <User size={14} className="mr-1" />
                <span>{change.author}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="flex items-center">
                  <span>{change.changedLines} lines</span>
                  {isLargeChange && (
                    <AlertCircle size={14} className="ml-1 text-amber-500" />
                  )}
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <span>Complexity: {(change.complexity * 10).toFixed(1)}</span>
                  {isHighComplexity && (
                    <AlertCircle size={14} className="ml-1 text-amber-500" />
                  )}
                </Badge>
                {change.components.map((component) => (
                  <Badge key={component} variant="secondary">
                    {component}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="ml-2 self-center text-muted-foreground">
              <ChevronRight size={16} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
