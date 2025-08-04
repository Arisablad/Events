import { Button } from '@heroui/react'
import { IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import type { DropzoneProps } from './Dropzone.types'

const Dropzone = ({
  value,
  onChange,
  error,
  label,
  isRequired = false,
  accept = { 'image/*': [] },
  multiple = false,
  maxSizeMB = 5,
  showPreview = true,
}: DropzoneProps) => {
  const [previews, setPreviews] = useState<string[]>([])
  const { t } = useTranslation('form')

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(
        (file) => file.size <= maxSizeMB * 1024 * 1024,
      )

      onChange(multiple ? validFiles : [validFiles[0]])
    },

    [onChange, maxSizeMB, multiple],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize: maxSizeMB * 1024 * 1024,
  })

  useEffect(() => {
    if (showPreview && value && value.length > 0) {
      const urls = value.map((file) => URL.createObjectURL(file))

      setPreviews(urls)

      return () => urls.forEach((url) => URL.revokeObjectURL(url))
    } else {
      setPreviews([])
    }
  }, [value, showPreview])

  const removeFile = (index: number) => {
    if (!value) return

    const newFiles = [...value]

    newFiles.splice(index, 1)

    onChange(newFiles)
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="text-sm font-medium">
          {label} {isRequired && '*'}
        </span>
      )}

      <div
        {...getRootProps()}
        className={clsx(
          'p-4 border-2 border-dashed rounded-xl cursor-pointer text-center transition',
          {
            'border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600':
              !isDragActive,
            'border-blue-400 bg-blue-50 dark:bg-blue-900 dark:border-blue-500':
              isDragActive,
            'border-red-500': !!error,
          },
        )}
      >
        <input {...getInputProps()} />
        <span className="text-sm text-gray-500">
          {isDragActive ? t('dropzone.active') : t('dropzone.inactive')}
        </span>
      </div>

      {error && (
        <span className="text-sm text-red-500" role="alert">
          {error}
        </span>
      )}

      {showPreview && previews.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-2">
          {previews.map((src, i) => (
            <div
              key={i}
              className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={src}
                alt={`preview-${i}`}
                className="w-full h-full object-cover"
              />
              <Button
                size="sm"
                color="danger"
                onPress={() => removeFile(i)}
                className="absolute top-1 right-1 p-0 w-5 h-5 text-xs"
                aria-label="Delete file"
                isIconOnly
              >
                <IconX size={12} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { Dropzone }
