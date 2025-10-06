"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdvancedPerformanceMonitor() {
  const [fps, setFps] = useState<number>(0);

  const measurePerformance = useCallback(() => {
    let frame = 0;
    const start = performance.now();
    requestAnimationFrame(() => {
      frame++;
      const duration = performance.now() - start;
      setFps(Math.round((frame / duration) * 1000));
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(measurePerformance, 1000);
    return () => clearInterval(interval);
  }, [measurePerformance]);

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Advanced Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <p>FPS: {fps}</p>
        <Button onClick={measurePerformance}>Measure Again</Button>
      </CardContent>
    </Card>
  );
}