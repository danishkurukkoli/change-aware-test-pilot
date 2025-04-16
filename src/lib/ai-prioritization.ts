
import { CodeChange, TestCase } from './data';

// This is a simulated AI prioritization system
// In a real-world application, this would connect to a proper machine learning model
export const prioritizeTestCases = (
  testCases: TestCase[],
  codeChanges: CodeChange[]
): TestCase[] => {
  // Create a deep copy of test cases to avoid mutating original data
  const prioritizedTests = JSON.parse(JSON.stringify(testCases)) as TestCase[];
  
  // In a real system, we would use a more sophisticated algorithm
  // For this demo, we'll use a simplified approach that:
  // 1. Calculates impact score based on component overlap with code changes
  // 2. Adjusts for test complexity, recent failures, and execution time
  
  prioritizedTests.forEach((test, index) => {
    // Check how many components in this test overlap with changed components
    let componentOverlapScore = 0;
    let changeImpactScore = 0;
    
    codeChanges.forEach((change) => {
      const sharedComponents = test.components.filter(component => 
        change.components.includes(component)
      );
      
      if (sharedComponents.length > 0) {
        // Factor in the number of changed lines and complexity
        componentOverlapScore += (sharedComponents.length / test.components.length);
        changeImpactScore += change.changedLines * change.complexity * (sharedComponents.length / change.components.length);
      }
    });
    
    // Consider test case history (failed tests get higher priority)
    const historyMultiplier = test.lastResult === 'fail' ? 1.5 : 1.0;
    
    // Consider coverage (how much of the changed code this test covers)
    // In this simplified model, we use the coverage array to represent coverage of each code change
    let coverageScore = 0;
    for (let i = 0; i < Math.min(codeChanges.length, test.coverage.length); i++) {
      coverageScore += test.coverage[i] * codeChanges[i].complexity * codeChanges[i].changedLines;
    }
    
    // Calculate final priority score
    // Higher is more important to test
    const priorityScore = (
      (componentOverlapScore * 0.3) + 
      (changeImpactScore * 0.3) + 
      (coverageScore * 0.2)
    ) * historyMultiplier;
    
    // Add some randomness to simulate real AI variability
    const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
    
    // Update priority score
    prioritizedTests[index].priority = Math.round(priorityScore * randomFactor * 100) / 100;
  });
  
  // Sort by priority (highest first)
  return prioritizedTests.sort((a, b) => b.priority - a.priority);
};

// Function to calculate coverage statistics
export const calculateCoverageStats = (
  testCases: TestCase[],
  codeChanges: CodeChange[]
) => {
  // Calculate how much of the changed code is covered by the top test cases
  const topTestCount = 3;
  const topTests = [...testCases].sort((a, b) => b.priority - a.priority).slice(0, topTestCount);
  
  // In a real system, we would calculate actual code coverage here
  // For this demo, we'll simulate it based on our test coverage data
  
  const totalChangedLines = codeChanges.reduce((sum, change) => sum + change.changedLines, 0);
  
  // Calculate estimated coverage of changed code by top tests
  let coveredLines = 0;
  
  topTests.forEach(test => {
    for (let i = 0; i < Math.min(codeChanges.length, test.coverage.length); i++) {
      // Avoid double-counting lines covered by multiple tests
      coveredLines += codeChanges[i].changedLines * test.coverage[i] * 0.2; // Adjust factor to make reasonable
    }
  });
  
  // Ensure covered lines doesn't exceed total lines
  coveredLines = Math.min(coveredLines, totalChangedLines);
  
  return {
    totalChangedLines,
    coveredLines: Math.round(coveredLines),
    coveragePercentage: Math.round((coveredLines / totalChangedLines) * 100),
    recommendedTestCount: Math.min(
      testCases.length,
      Math.max(2, Math.ceil(codeChanges.length * 1.5)) // Recommend at least 2 tests, or 1.5x the number of changes
    )
  };
};

// Function to generate insights from the prioritization
export const generateInsights = (
  prioritizedTests: TestCase[],
  codeChanges: CodeChange[]
): string[] => {
  const insights: string[] = [];
  
  // Check if there are high-risk areas with low test coverage
  const riskyChanges = codeChanges.filter(change => change.complexity > 0.7);
  if (riskyChanges.length > 0) {
    insights.push(`${riskyChanges.length} high-complexity code changes detected that require careful testing.`);
  }
  
  // Check for recently failed tests that should be prioritized
  const recentFailures = prioritizedTests.filter(test => test.lastResult === 'fail');
  if (recentFailures.length > 0) {
    insights.push(`${recentFailures.length} tests failed in the last run and should be prioritized.`);
  }
  
  // Look for components with high change volume
  const componentChangeCounts: Record<string, number> = {};
  codeChanges.forEach(change => {
    change.components.forEach(component => {
      componentChangeCounts[component] = (componentChangeCounts[component] || 0) + change.changedLines;
    });
  });
  
  const highChangeComponents = Object.entries(componentChangeCounts)
    .filter(([_, count]) => count > 50)
    .map(([component]) => component);
    
  if (highChangeComponents.length > 0) {
    insights.push(`The following components have significant changes: ${highChangeComponents.join(', ')}.`);
  }
  
  // Calculate test execution time for top priority tests
  const topTests = prioritizedTests.slice(0, 5);
  const totalExecutionTime = topTests.reduce((sum, test) => sum + test.executionTime, 0);
  insights.push(`Running the top 5 prioritized tests will take approximately ${totalExecutionTime.toFixed(1)} minutes.`);
  
  return insights;
};
