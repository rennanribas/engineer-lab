export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

export type NavigationState = 'home' | 'visualizer';

export interface NavigationContextType {
  currentPage: NavigationState;
  setCurrentPage: (page: NavigationState) => void;
}