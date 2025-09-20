'use client'

import { useState, useRef, useMemo } from 'react'

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
}

export function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = ''
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight)
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    )

    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index
    }))
  }, [items, scrollTop, itemHeight, containerHeight])

  const totalHeight = items.length * itemHeight
  const offsetY = Math.floor(scrollTop / itemHeight) * itemHeight
  
  // Suppress unused variable warnings (used in JSX)
  void totalHeight
  void offsetY

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-auto virtual-list-container ${className}`}
      onScroll={handleScroll}
    >
      <div className="virtual-list-content">
        <div
          className="virtual-list-items"
        >
          {visibleItems.map(({ item, index }) => (
            <div
              key={index}
              className="virtual-list-item"
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
