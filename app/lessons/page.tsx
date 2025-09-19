'use client'

import { useSearchParams } from 'next/navigation'
import { LessonsOverview } from '@/components/lessons/lessons-overview'

export default function LessonsPage() {
  const searchParams = useSearchParams()
  const groupId = searchParams.get('group')
  
  return <LessonsOverview groupId={groupId} />
}
