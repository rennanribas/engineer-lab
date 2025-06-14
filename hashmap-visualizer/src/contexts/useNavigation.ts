import { useContext } from 'react';
import type { NavigationContextType } from '../types/navigation';
import { NavigationContext } from './NavigationContextProvider';

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};