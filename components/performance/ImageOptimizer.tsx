'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Badge } from '@/components/core/badge'
import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import {
  Image as ImageIcon,
  Download,
  Zap,
  CheckCircle,
  Settings
} from 'lucide-react'

interface ImageOptimizationResult {
  originalSize: number
  optimizedSize: number
  compressionRatio: number
  format: string
  quality: number
  dimensions: { width: number; height: number }
}

export function ImageOptimizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [optimizationResults, setOptimizationResults] = useState<ImageOptimizationResult[]>([])
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [settings, setSettings] = useState({
    quality: 80,
    format: 'webp',
    maxWidth: 1920,
    maxHeight: 1080,
    progressive: true
  })

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
    }
  }, [])

  const optimizeImage = async () => {
    if (!selectedFile) return

    setIsOptimizing(true)

    // Simulate image optimization process
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock optimization results
    const originalSize = selectedFile.size
    const optimizedSize = Math.floor(originalSize * 0.6) // 40% reduction
    const compressionRatio = ((originalSize - optimizedSize) / originalSize) * 100

    const result: ImageOptimizationResult = {
      originalSize,
      optimizedSize,
      compressionRatio,
      format: settings.format,
      quality: settings.quality,
      dimensions: { width: 1920, height: 1080 }
    }

    setOptimizationResults(prev => [result, ...prev])
    setIsOptimizing(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getCompressionColor = (ratio: number) => {
    if (ratio > 50) return 'text-green-600 bg-green-100'
    if (ratio > 30) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Image Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="flex-1"
            />
            <Button
              onClick={optimizeImage}
              disabled={!selectedFile || isOptimizing}
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
                  Optimize
                </>
              )}
            </Button>
          </div>

          {selectedFile && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span className="font-medium">{selectedFile.name}</span>
                <Badge variant="outline">
                  {formatFileSize(selectedFile.size)}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Optimization Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Optimization Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quality">Quality</Label>
              <Input
                id="quality"
                type="range"
                min="50"
                max="100"
                value={settings.quality}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  quality: parseInt(e.target.value)
                }))}
                className="mt-1"
              />
              <div className="text-sm text-muted-foreground mt-1">
                {settings.quality}% quality
              </div>
            </div>

            <div>
              <Label htmlFor="format">Format</Label>
              <select
                id="format"
                value={settings.format}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  format: e.target.value
                }))}
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="webp">WebP</option>
                <option value="avif">AVIF</option>
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
              </select>
            </div>

            <div>
              <Label htmlFor="maxWidth">Max Width</Label>
              <Input
                id="maxWidth"
                type="number"
                value={settings.maxWidth}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  maxWidth: parseInt(e.target.value)
                }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="maxHeight">Max Height</Label>
              <Input
                id="maxHeight"
                type="number"
                value={settings.maxHeight}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  maxHeight: parseInt(e.target.value)
                }))}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {optimizationResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Optimization Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optimizationResults.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Image optimized successfully</span>
                    </div>
                    <Badge className={getCompressionColor(result.compressionRatio)}>
                      {result.compressionRatio.toFixed(1)}% smaller
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Original</div>
                      <div className="font-medium">{formatFileSize(result.originalSize)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Optimized</div>
                      <div className="font-medium">{formatFileSize(result.optimizedSize)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Format</div>
                      <div className="font-medium">{result.format.toUpperCase()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Quality</div>
                      <div className="font-medium">{result.quality}%</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Compare
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Images Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{optimizationResults.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Average Compression</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {optimizationResults.length > 0
                ? (optimizationResults.reduce((sum, r) => sum + r.compressionRatio, 0) / optimizationResults.length).toFixed(1)
                : '0'
              }%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Space Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatFileSize(
                optimizationResults.reduce((sum, r) => sum + (r.originalSize - r.optimizedSize), 0)
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

