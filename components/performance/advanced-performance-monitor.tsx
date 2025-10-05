"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdvancedPerformanceMonitor() {
  const [metrics, setMetrics] = useState<number[]>([]);

  const updateMetrics = useCallback(() => {
    // עדכון מדדים לדוגמה
    setMetrics([Math.random() * 100, Math.random() * 100]);
  }, []);

  useEffect(() => {
    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, [updateMetrics]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Performance Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        {metrics.map((m, i) => (
          <p key={i}>Metric {i + 1}: {m.toFixed(2)}</p>
        ))}
        <Button onClick={updateMetrics}>Refresh Metrics</Button>
      </CardContent>
    </Card>
  );
}