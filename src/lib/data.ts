
// Sample mock data for the application

// Types
export interface CodeChange {
  id: string;
  fileName: string;
  changedLines: number;
  complexity: number;
  components: string[];
  timestamp: string;
  author: string;
}

export interface TestCase {
  id: string;
  name: string;
  components: string[];
  lastRun: string;
  lastResult: "pass" | "fail" | "skipped" | null;
  executionTime: number;
  priority: number;
  coverage: number[];
}

export interface TestRun {
  id: string;
  date: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
}

// Mock code changes
export const codeChanges: CodeChange[] = [
  {
    id: "c1",
    fileName: "src/components/auth/login.tsx",
    changedLines: 45,
    complexity: 0.8,
    components: ["authentication", "user-interface"],
    timestamp: "2025-04-15T10:30:00Z",
    author: "jane.doe"
  },
  {
    id: "c2",
    fileName: "src/utils/validation.ts",
    changedLines: 23,
    complexity: 0.6,
    components: ["validation", "utilities"],
    timestamp: "2025-04-15T11:45:00Z",
    author: "john.smith"
  },
  {
    id: "c3",
    fileName: "src/api/endpoints.ts",
    changedLines: 67,
    complexity: 0.9,
    components: ["api", "backend-integration"],
    timestamp: "2025-04-14T15:20:00Z",
    author: "emma.wilson"
  },
  {
    id: "c4",
    fileName: "src/features/dashboard/metrics.tsx",
    changedLines: 102,
    complexity: 0.75,
    components: ["dashboard", "metrics", "visualization"],
    timestamp: "2025-04-14T09:15:00Z",
    author: "michael.brown"
  },
  {
    id: "c5",
    fileName: "src/store/reducers/user.ts",
    changedLines: 35,
    complexity: 0.65,
    components: ["state-management", "user-data"],
    timestamp: "2025-04-13T14:10:00Z",
    author: "sarah.jones"
  }
];

// Mock test cases
export const testCases: TestCase[] = [
  {
    id: "t1",
    name: "User Login Authentication Flow",
    components: ["authentication", "user-interface"],
    lastRun: "2025-04-14T08:00:00Z",
    lastResult: "pass",
    executionTime: 3.5,
    priority: 0,
    coverage: [0.9, 0.8, 0.2, 0.1, 0.4]
  },
  {
    id: "t2",
    name: "Input Validation for Registration Form",
    components: ["validation", "user-interface", "registration"],
    lastRun: "2025-04-14T08:05:00Z",
    lastResult: "fail",
    executionTime: 2.1,
    priority: 0,
    coverage: [0.3, 0.9, 0.1, 0.2, 0.2]
  },
  {
    id: "t3",
    name: "API Integration with User Services",
    components: ["api", "backend-integration", "user-data"],
    lastRun: "2025-04-14T08:10:00Z",
    lastResult: "pass",
    executionTime: 4.8,
    priority: 0,
    coverage: [0.2, 0.3, 0.9, 0.1, 0.5]
  },
  {
    id: "t4",
    name: "Dashboard Metrics Rendering",
    components: ["dashboard", "metrics", "visualization"],
    lastRun: "2025-04-14T08:15:00Z",
    lastResult: "pass",
    executionTime: 3.2,
    priority: 0,
    coverage: [0.1, 0.2, 0.1, 0.9, 0.2]
  },
  {
    id: "t5",
    name: "User Profile State Management",
    components: ["state-management", "user-data", "user-interface"],
    lastRun: "2025-04-14T08:20:00Z",
    lastResult: "skip",
    executionTime: 2.7,
    priority: 0,
    coverage: [0.4, 0.2, 0.5, 0.3, 0.8]
  },
  {
    id: "t6",
    name: "User Password Reset Flow",
    components: ["authentication", "email-service", "user-data"],
    lastRun: "2025-04-14T08:25:00Z",
    lastResult: "pass",
    executionTime: 5.1,
    priority: 0,
    coverage: [0.7, 0.4, 0.3, 0.1, 0.4]
  },
  {
    id: "t7",
    name: "Session Timeout Handling",
    components: ["authentication", "security", "user-interface"],
    lastRun: "2025-04-14T08:30:00Z",
    lastResult: "pass",
    executionTime: 1.9,
    priority: 0,
    coverage: [0.8, 0.1, 0.2, 0.1, 0.1]
  },
  {
    id: "t8",
    name: "Data Export Functionality",
    components: ["data-processing", "file-system", "user-interface"],
    lastRun: "2025-04-14T08:35:00Z",
    lastResult: "fail",
    executionTime: 6.3,
    priority: 0,
    coverage: [0.1, 0.3, 0.4, 0.2, 0.3]
  }
];

// Mock test runs
export const testRuns: TestRun[] = [
  {
    id: "r1",
    date: "2025-04-14T08:00:00Z",
    totalTests: 120,
    passed: 98,
    failed: 16,
    skipped: 6,
    duration: 385
  },
  {
    id: "r2",
    date: "2025-04-13T08:00:00Z",
    totalTests: 118,
    passed: 104,
    failed: 9,
    skipped: 5,
    duration: 372
  },
  {
    id: "r3",
    date: "2025-04-12T08:00:00Z",
    totalTests: 115,
    passed: 101,
    failed: 11,
    skipped: 3,
    duration: 401
  },
  {
    id: "r4",
    date: "2025-04-11T08:00:00Z",
    totalTests: 112,
    passed: 97,
    failed: 12,
    skipped: 3,
    duration: 398
  },
  {
    id: "r5",
    date: "2025-04-10T08:00:00Z",
    totalTests: 110,
    passed: 94,
    failed: 10,
    skipped: 6,
    duration: 378
  }
];
