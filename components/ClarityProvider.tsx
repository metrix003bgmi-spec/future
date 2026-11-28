'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export default function ClarityProvider() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    
    // Only run in production to avoid recording local development clicks
    if (projectId && process.env.NODE_ENV === 'production') {
      Clarity.init(projectId);
    }
  }, []);

  return null;
}
