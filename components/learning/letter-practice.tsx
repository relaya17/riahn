// Main Letter Practice Component - Entry Point
'use client'

import React from 'react'
import { LetterPracticeGame } from './letter-practice/LetterPracticeGame'

interface LetterPracticeProps {
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export function LetterPractice({ language, difficulty }: LetterPracticeProps) {
  return <LetterPracticeGame language={language} difficulty={difficulty} />
}
