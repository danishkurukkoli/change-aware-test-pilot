
import React from 'react';
import { TestCase } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TestCaseTableProps {
  testCases: TestCase[];
  isLoading: boolean;
}

export const TestCaseTable: React.FC<TestCaseTableProps> = ({ testCases, isLoading }) => {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Priority</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead>Components</TableHead>
            <TableHead>Last Result</TableHead>
            <TableHead className="text-right">Execution Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-6 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[250px]" />
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-10 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  const getResultBadge = (result: string | null) => {
    switch(result) {
      case 'pass':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle size={14} />
            <span>Pass</span>
          </Badge>
        );
      case 'fail':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle size={14} />
            <span>Fail</span>
          </Badge>
        );
      case 'skipped':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
            <Clock size={14} />
            <span>Skipped</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
            <AlertTriangle size={14} />
            <span>Unknown</span>
          </Badge>
        );
    }
  };
  
  const getPriorityColor = (priority: number) => {
    if (priority >= 0.7) return "bg-red-500";
    if (priority >= 0.4) return "bg-amber-500";
    return "bg-emerald-500";
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Priority</TableHead>
          <TableHead>Test Name</TableHead>
          <TableHead>Components</TableHead>
          <TableHead>Last Result</TableHead>
          <TableHead className="text-right">Execution Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testCases.map((test) => (
          <TableRow key={test.id}>
            <TableCell>
              <div className="space-y-1">
                <Progress 
                  value={test.priority * 100} 
                  className="h-2 w-full" 
                  indicatorClassName={getPriorityColor(test.priority)} 
                />
                <div className="text-sm font-medium">Score: {test.priority.toFixed(2)}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{test.name}</div>
              <div className="text-xs text-muted-foreground">
                Last run: {formatDistanceToNow(new Date(test.lastRun), { addSuffix: true })}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {test.components.map((component) => (
                  <Badge key={component} variant="secondary" className="text-xs">
                    {component}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>{getResultBadge(test.lastResult)}</TableCell>
            <TableCell className="text-right">{test.executionTime.toFixed(1)}m</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
