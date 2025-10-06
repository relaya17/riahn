"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/core/button";
import { Badge } from "@/components/core/badge";

export default function QuickPerformance() {
  const [loadTime, setLoadTime] = useState<number>(0);

  useEffect(() => {
    const start = performance.now();
    setLoadTime(performance.now() - start);
  }, []);

  return (
    <div className="p-4">
      <h3>Quick Performance Monitor</h3>
      <Badge>Load Time: {loadTime.toFixed(2)} ms</Badge>
      <Button onClick={() => window.location.reload()}>Reload</Button>
    </div>
  );
}
