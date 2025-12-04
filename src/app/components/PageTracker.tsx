'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function PageTracker() {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      const trackView = async () => {
        await supabase.rpc('increment_view_count'); 
      };

      trackView();
      hasTracked.current = true;
    }
  }, []);

  return null;
}