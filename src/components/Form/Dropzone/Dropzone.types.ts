import type { Nullable } from '@/types/global'

type DropzoneProps = {
  value: Nullable<File[]>
  onChange: (files: File[]) => void
  error?: string
  label?: string
  isRequired?: boolean
  accept?: Record<string, string[]>
  multiple?: boolean
  maxSizeMB?: number
  showPreview?: boolean
}

export type { DropzoneProps }
