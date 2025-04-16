
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb } from "lucide-react";

interface InsightsProps {
  insights: string[];
  isLoading: boolean;
}

export const Insights: React.FC<InsightsProps> = ({ insights, isLoading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb size={20} className="mr-2 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mr-3 mt-1" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mr-3 mt-1" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mr-3 mt-1" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mr-3 mt-1" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {insights.length > 0 ? (
              insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">
                No insights available. Run the prioritization algorithm to generate insights.
              </li>
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
