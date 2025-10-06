"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/card";
import { Button } from "@/components/core/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/tabs";
import { PerformanceOptimizer } from './PerformanceOptimizer';
import { ImageOptimizer } from './ImageOptimizer';

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
        <CardTitle>Advanced Performance Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="realtime" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="realtime">Real-time</TabsTrigger>
            <TabsTrigger value="optimizer">Optimizer</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="realtime" className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">{fps} FPS</p>
              <p className="text-sm text-muted-foreground">
                Current frame rate
              </p>
              <Button onClick={measurePerformance} className="mt-4">
                Measure Performance
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="optimizer">
            <PerformanceOptimizer />
          </TabsContent>

          <TabsContent value="images">
            <ImageOptimizer />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
