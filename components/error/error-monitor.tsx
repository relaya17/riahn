"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ErrorMonitor() {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // כאן ניתן לאסוף או לנטר שגיאות
    // לדוגמה:
    // setErrors(["Error 1", "Error 2"]);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        {errors.length === 0 ? (
          <p>No errors</p>
        ) : (
          errors.map((err, i) => <Badge key={i}>{err}</Badge>)
        )}
      </CardContent>
    </Card>
  );
}