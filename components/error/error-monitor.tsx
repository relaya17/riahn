"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ErrorMonitor() {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setErrors((prev) => [...prev, `Error at ${new Date().toLocaleTimeString()}`]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Error Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        {errors.length === 0 ? (
          <Badge>No errors</Badge>
        ) : (
          errors.map((err, i) => (
            <div key={i} className="p-1 text-red-500">
              {err}
            </div>
          ))
        )}
        <Button onClick={() => setErrors([])}>Clear</Button>
      </CardContent>
    </Card>
  );
}