'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Badge } from '@/components/core/badge'
import { Progress } from '@/components/core/progress'
import {
  Zap,
  TrendingUp,
  Activity,
  Clock,
  Database,
  Image,
  Cpu,
  HardDrive
} from 'lucide-react'

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  cpuUsage: number
  loadTime: number
  bundleSize: number
  imageOptimizations: number
  cacheHits: number
  cacheMisses: number
}

interface OptimizationRecommendation {
  id: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  difficulty: 'easy' | 'medium' | 'hard'
  category: 'performance' | 'bundle' | 'caching' | 'images'
}

export function PerformanceOptimizer() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 45,
    cpuUsage: 23,
    loadTime: 1200,
    bundleSize: 2.1,
    imageOptimizations: 85,
    cacheHits: 78,
    cacheMisses: 22
  })

  const [isOptimizing, setIsOptimizing] = useState(false)

  // Simulate real-time metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        fps: Math.max(30, Math.min(60, prev.fps + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(20, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        cpuUsage: Math.max(10, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 3)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const recommendations: OptimizationRecommendation[] = useMemo(() => [
    {
      id: '1',
      title: 'Image Optimization',
      description: 'Convert images to WebP format and implement lazy loading',
      impact: 'high',
      difficulty: 'easy',
      category: 'images'
    },
    {
      id: '2',
      title: 'Code Splitting',
      description: 'Split large components into smaller chunks',
      impact: 'high',
      difficulty: 'medium',
      category: 'bundle'
    },
    {
      id: '3',
      title: 'Caching Strategy',
      description: 'Implement proper caching for API responses and static assets',
      impact: 'medium',
      difficulty: 'medium',
      category: 'caching'
    },
    {
      id: '4',
      title: 'Bundle Analysis',
      description: 'Analyze and remove unused dependencies',
      impact: 'high',
      difficulty: 'hard',
      category: 'bundle'
    },
    {
      id: '5',
      title: 'Performance Monitoring',
      description: 'Add real-time performance monitoring and alerts',
      impact: 'medium',
      difficulty: 'medium',
      category: 'performance'
    }
  ], [])

  const optimizePerformance = async () => {
    setIsOptimizing(true)

    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 3000))

    setMetrics(prev => ({
      ...prev,
      bundleSize: Math.max(1.5, prev.bundleSize - 0.3),
      imageOptimizations: Math.min(100, prev.imageOptimizations + 10),
      cacheHits: Math.min(95, prev.cacheHits + 5),
      loadTime: Math.max(800, prev.loadTime - 200)
    }))

    setIsOptimizing(false)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FPS</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.fps.toFixed(1)}</div>
            <Progress value={(metrics.fps / 60) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.memoryUsage.toFixed(1)}%</div>
            <Progress value={metrics.memoryUsage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.cpuUsage.toFixed(1)}%</div>
            <Progress value={metrics.cpuUsage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Load Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(metrics.loadTime / 1000).toFixed(2)}s</div>
            <div className="text-xs text-muted-foreground mt-1">
              {(100 - (metrics.loadTime / 2000) * 100).toFixed(1)}% improvement
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bundle & Image Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-5 h-5" />
              Bundle Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Bundle Size</span>
              <Badge variant="outline">{metrics.bundleSize.toFixed(1)} MB</Badge>
            </div>

            <div className="flex justify-between items-center">
              <span>Cache Hit Rate</span>
              <Badge variant="outline">{metrics.cacheHits}%</Badge>
            </div>

            <div className="flex justify-between items-center">
              <span>Image Optimizations</span>
              <Badge variant="outline">{metrics.imageOptimizations}%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Optimization Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Images Optimized</span>
              <Badge className={metrics.imageOptimizations > 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {metrics.imageOptimizations > 80 ? 'Excellent' : 'Good'}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span>Bundle Size</span>
              <Badge className={metrics.bundleSize < 2 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {metrics.bundleSize < 2 ? 'Optimal' : 'Large'}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span>Load Time</span>
              <Badge className={metrics.loadTime < 1000 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {metrics.loadTime < 1000 ? 'Fast' : 'Slow'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Optimization Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>

                  <div className="flex gap-2 mt-2">
                    <Badge className={getImpactColor(rec.impact)}>
                      {rec.impact} impact
                    </Badge>
                    <Badge className={getDifficultyColor(rec.difficulty)}>
                      {rec.difficulty} difficulty
                    </Badge>
                    <Badge variant="outline">
                      {rec.category}
                    </Badge>
                  </div>
                </div>

                <Button size="sm" variant="outline">
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Performance Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              onClick={optimizePerformance}
              disabled={isOptimizing}
              className="flex items-center gap-2"
            >
              {isOptimizing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Optimizing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Run Optimization
                </>
              )}
            </Button>

            <Button variant="outline">
              Clear Cache
            </Button>

            <Button variant="outline">
              Analyze Bundle
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

