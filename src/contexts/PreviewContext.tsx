'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { PreviewMode } from '@/types';

const PreviewContext = createContext<PreviewMode | undefined>(undefined);

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <PreviewContext.Provider value={{ mode, setMode }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);
  if (context === undefined) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
}
