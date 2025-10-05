'use client'

import { LessonsOverview } from '@/components/lessons/lessons-overview'

export const dynamic = 'force-dynamic'

export default function LessonsPage() {
  return <LessonsOverview groupId={null} />
}
