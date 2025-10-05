'use client'

import { ReactNode } from 'react'
import { useForm, FieldValues, UseFormReturn, DefaultValues, Path } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading'

export interface BaseFormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  validation?: {
    required?: string
    minLength?: { value: number; message: string }
    maxLength?: { value: number; message: string }
    pattern?: { value: RegExp; message: string }
    validate?: (value: unknown) => boolean | string
  }
  options?: { value: string; label: string }[]
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  helperText?: string
  disabled?: boolean
  className?: string
}

export interface BaseFormProps<T extends FieldValues> {
  title?: string
  subtitle?: string
  fields: BaseFormField[]
  onSubmit: (data: T, form: UseFormReturn<T>) => void | Promise<void>
  submitText: string
  isLoading?: boolean
  defaultValues?: Partial<T>
  actions?: ReactNode
  footer?: ReactNode
  className?: string
  cardClassName?: string
  showCard?: boolean
}

export function BaseForm<T extends FieldValues>({
  title,
  subtitle,
  fields,
  onSubmit,
  submitText,
  isLoading = false,
  defaultValues,
  actions,
  footer,
  className = '',
  cardClassName = '',
  showCard = true
}: BaseFormProps<T>) {
  const form = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form
  
  // Suppress unused variable warnings (available for advanced usage)
  const watch = form.watch
  const setValue = form.setValue
  void watch
  void setValue

  const handleFormSubmit = async (data: T) => {
    try {
      await onSubmit(data, form as unknown as UseFormReturn<T>)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const renderField = (field: BaseFormField) => {
    const validation: Record<string, unknown> = {}
    
    if (field.validation?.required) {
      validation.required = field.validation.required
    }
    if (field.validation?.minLength) {
      validation.minLength = field.validation.minLength
    }
    if (field.validation?.maxLength) {
      validation.maxLength = field.validation.maxLength
    }
    if (field.validation?.pattern) {
      validation.pattern = field.validation.pattern
    }
    if (field.validation?.validate) {
      validation.validate = field.validation.validate
    }

    const commonProps = {
      ...register(field.name as Path<T>, validation),
      placeholder: field.placeholder,
      disabled: field.disabled || isLoading,
      className: field.className
    }

    const error = errors[field.name as keyof T]?.message as string

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              <textarea
                {...commonProps}
                rows={4}
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                } ${commonProps.className || ''}`}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{field.helperText}</p>
            )}
          </div>
        )

      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              {...commonProps}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
              } ${commonProps.className || ''}`}
            >
              {field.placeholder && (
                <option value="">{field.placeholder}</option>
              )}
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{field.helperText}</p>
            )}
          </div>
        )

      case 'checkbox':
        return (
          <div key={field.name} className="flex items-center space-x-2 space-x-reverse">
            <input
              {...commonProps}
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
        )

      case 'radio':
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 space-x-reverse">
                  <input
                    {...register(field.name as Path<T>, validation)}
                    type="radio"
                    value={option.value}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    disabled={field.disabled || isLoading}
                  />
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
        )

      default:
        // text, email, password
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              {field.leftIcon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{field.leftIcon}</span>
                </div>
              )}
              <input
                {...commonProps}
                type={field.type}
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                } ${field.leftIcon ? 'pl-10' : ''} ${field.rightIcon ? 'pr-10' : ''} ${commonProps.className || ''}`}
              />
              {field.rightIcon && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {field.rightIcon}
                </div>
              )}
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            {field.helperText && !error && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{field.helperText}</p>
            )}
          </div>
        )
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit(handleFormSubmit as unknown as (data: T) => void)} className={`space-y-6 ${className}`}>
      {fields.map(renderField)}
      
      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && <LoadingSpinner className="mr-2" />}
          {submitText}
        </Button>
        
        {actions}
      </div>
      
      {footer}
    </form>
  )

  if (!showCard) {
    return formContent
  }

  return (
    <Card className={cardClassName}>
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </CardHeader>
      )}
      <CardContent>
        {formContent}
      </CardContent>
    </Card>
  )
}

// Hook for easier form management
export function useBaseForm<T extends FieldValues>(defaultValues?: Partial<T>) {
  return useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>
  })
}
