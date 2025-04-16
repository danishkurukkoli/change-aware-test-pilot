
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeChangesList } from './CodeChangesList';
import { TestCaseTable } from './TestCaseTable';
import { MetricsPanel } from './MetricsPanel';
import { Insights } from './Insights';
import { codeChanges, testCases } from '@/lib/data';
import { prioritizeTestCases, calculateCoverageStats, generateInsights } from '@/lib/ai-prioritization';

const Dashboard = () => {
  const [prioritizedTests, setPrioritizedTests] = useState(testCases);
  const [coverageStats, setCoverageStats] = useState({
    totalChangedLines: 0,
    coveredLines: 0,
    coveragePercentage: 0,
    recommendedTestCount: 0
  });
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      const prioritized = prioritizeTestCases(testCases, codeChanges);
      setPrioritizedTests(prioritized);
      
      const stats = calculateCoverageStats(prioritized, codeChanges);
      setCoverageStats(stats);
      
      const generatedInsights = generateInsights(prioritized, codeChanges);
      setInsights(generatedInsights);
      
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const runPrioritization = () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const prioritized = prioritizeTestCases(testCases, codeChanges);
      setPrioritizedTests(prioritized);
      
      const stats = calculateCoverageStats(prioritized, codeChanges);
      setCoverageStats(stats);
      
      const generatedInsights = generateInsights(prioritized, codeChanges);
      setInsights(generatedInsights);
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Test Prioritization System</h1>
        <p className="text-muted-foreground mt-1">Optimize regression testing by prioritizing tests based on code changes</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <MetricsPanel 
          coverageStats={coverageStats}
          isLoading={isLoading}
          onRunPrioritization={runPrioritization}
        />
        <div className="lg:col-span-2">
          <Insights insights={insights} isLoading={isLoading} />
        </div>
      </div>
      
      <Tabs defaultValue="test-cases" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="test-cases">Prioritized Tests</TabsTrigger>
          <TabsTrigger value="code-changes">Code Changes</TabsTrigger>
        </TabsList>
        <TabsContent value="test-cases" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Case Prioritization</CardTitle>
              <CardDescription>
                Test cases ranked by their importance for the current code changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TestCaseTable testCases={prioritizedTests} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code-changes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Code Changes</CardTitle>
              <CardDescription>
                Changes detected in the codebase that require testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeChangesList codeChanges={codeChanges} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
