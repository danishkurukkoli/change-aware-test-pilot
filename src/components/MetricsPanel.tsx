
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, Target, Zap } from "lucide-react";

interface MetricsPanelProps {
  coverageStats: {
    totalChangedLines: number;
    coveredLines: number;
    coveragePercentage: number;
    recommendedTestCount: number;
  };
  isLoading: boolean;
  onRunPrioritization: () => void;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ 
  coverageStats, 
  isLoading,
  onRunPrioritization
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target size={20} className="mr-2 text-primary" />
          Coverage Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-8 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-[40px]" />
                <Skeleton className="h-4 w-[40px]" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-[60px] w-full" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Code Coverage</span>
                <span className="text-primary">{coverageStats.coveragePercentage}%</span>
              </div>
              <Progress value={coverageStats.coveragePercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-2xl font-bold">{coverageStats.coveredLines}</div>
                <div className="text-xs text-muted-foreground">Lines Covered</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-2xl font-bold">{coverageStats.totalChangedLines}</div>
                <div className="text-xs text-muted-foreground">Total Changed Lines</div>
              </div>
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center">
                <Zap size={18} className="text-primary mr-2" />
                <span className="font-medium">AI Recommendation</span>
              </div>
              <p className="text-sm mt-2">
                Run the top {coverageStats.recommendedTestCount} tests to achieve optimal coverage with minimal execution time.
              </p>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onRunPrioritization} 
          disabled={isLoading} 
          className="w-full"
        >
          {isLoading ? (
            <>
              <RefreshCw size={16} className="mr-2 animate-spin" />
              Processing
            </>
          ) : (
            <>
              <RefreshCw size={16} className="mr-2" />
              Re-Run Prioritization
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
