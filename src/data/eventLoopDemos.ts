import type { DemoOption } from './dataStructuresDemos'; // Reusing DemoOption type

export const eventLoopDemoOptions: DemoOption[] = [
  {
    id: 'basic',
    label: 'Basic Execution',
    description: 'Simple synchronous and asynchronous execution flow',
    complexity: 'Basic',
  },
  {
    id: 'promises',
    label: 'Promises vs Timers',
    description: 'Understanding microtask queue priority over task queue',
    complexity: 'Intermediate',
  },
  {
    id: 'timers',
    label: 'Multiple Timers',
    description: 'Different timer delays and execution order',
    complexity: 'Intermediate',
  },
  {
    id: 'mixed',
    label: 'Mixed Operations',
    description: 'Complex scenario with promises, timers, and sync code',
    complexity: 'Advanced',
  },
];