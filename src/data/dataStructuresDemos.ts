export interface DemoOption {
  id: string
  label: string
  description: string
  complexity: 'Basic' | 'Intermediate' | 'Advanced'
}

export const hashMapDemos: DemoOption[] = [
  {
    id: 'basic',
    label: 'Basic Operations',
    description: 'Simple get, set, and delete operations on hash map',
    complexity: 'Basic',
  },
  {
    id: 'collision',
    label: 'Hash Collisions',
    description: 'Understanding how collisions are handled with chaining',
    complexity: 'Intermediate',
  },
  {
    id: 'resize',
    label: 'Dynamic Resizing',
    description: 'Automatic resizing when load factor exceeds threshold',
    complexity: 'Intermediate',
  },
]

// Future demos can be added here
// export const binaryTreeDemos: DemoOption[] = [...]
// export const graphDemos: DemoOption[] = [...]
