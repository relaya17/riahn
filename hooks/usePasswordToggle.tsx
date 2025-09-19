import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export function usePasswordToggle(initialValue = false) {
  const [showPassword, setShowPassword] = useState(initialValue)
  
  const togglePassword = () => setShowPassword(!showPassword)
  
  const PasswordIcon = showPassword ? EyeOff : Eye
  
  const getInputType = () => showPassword ? 'text' : 'password'
  
  const getIconButton = (className = 'text-gray-400 hover:text-gray-600') => (
    <button
      type="button"
      onClick={togglePassword}
      className={className}
      title={showPassword ? 'Hide password' : 'Show password'}
    >
      <PasswordIcon className="h-4 w-4" />
    </button>
  )
  
  return {
    showPassword,
    togglePassword,
    PasswordIcon,
    getInputType,
    getIconButton
  }
}