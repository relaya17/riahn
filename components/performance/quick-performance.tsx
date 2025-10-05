"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function QuickPerformance() {
  const [status, setStatus] = useState<string>("Loading...");

  useEffect(() => {
    const timer = setTimeout(() => setStatus("All systems operational"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("flex flex-col gap-2")}>
      <Badge>{status}</Badge>
      <Button onClick={() => setStatus("Refreshing...")}>Refresh Status</Button>
    </div>
  );
}