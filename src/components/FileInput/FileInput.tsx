import type { ChangeEvent, DragEvent } from 'react'
import {
  ErrorMessage,
  FileInputContainer,
  FileInputLabel,
  HiddenInput,
  MutedText,
  StyledButton,
  StyledFileIcon,
  StyledUploadIcon,
} from './styled'
import fileSize from 'pretty-bytes'
import { useEffect, useMemo, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import clsx from 'clsx'
import FileStatus from './FileStatus'

export interface Base64FileBlob {
  name: string
  raw: string // base64encoded file
}

interface FileInputProps {
  id?: string
  maxFileSize?: number
  onChangeBlob?: (blob: Base64FileBlob | null) => void
  onChange?: (files: File | null) => void
  className?: string
  containerClassName?: string
}

function getFileSizeError(limit: number, subjectFileSize?: number) {
  if (limit && subjectFileSize && subjectFileSize > limit) {
    return `File too large (Max: ${fileSize(limit)})`
  }

  return null
}

export default function FileInput({
  id = 'input-field',
  maxFileSize = 0,
  onChangeBlob,
  onChange,
  className,
  containerClassName,
}: FileInputProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [value, setValue] = useState<File | null>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [blobSize, setBlobSize] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const inputId = useMemo(() => {
    return id || `FileInput-id-${nanoid()}`
  }, [id])

  useEffect(() => {
    if (value === undefined) {
      return
    }
    setBlobSize(null)
    if (!!onChangeBlob) {
      if (value === null) {
        onChangeBlob({name: '', raw: ''})
        return
      }

      new Promise<Base64FileBlob>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          const name = fileReader.result !== null && value ? value.name : ''
          const raw =
            fileReader.result !== null ? (fileReader.result as string) : ''
          const fileBlob = new Blob([raw])
          setBlobSize(fileBlob.size)
          const error = getFileSizeError(maxFileSize, fileBlob.size)
          if (error) {
            return reject(error)
          }

          resolve({name, raw})
        }

        fileReader.readAsDataURL(value)
      }).then((blob: Base64FileBlob) => {
        onChangeBlob(blob)
      }).catch((message) => {
        setErrorMessage(message)
      })
    }

    !!onChange && !errorMessage && onChange(value || null)
  }, [value])

  const preventDefault = (
    event: DragEvent<HTMLElement> | ChangeEvent<HTMLElement>,
  ) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDragOverStart = (event: DragEvent<HTMLElement>) => {
    preventDefault(event)
    setIsDragOver(true)
  }

  const handleDragOverEnd = (
    event: DragEvent<HTMLElement> | ChangeEvent<HTMLElement>,
  ) => {
    preventDefault(event)
    setIsDragOver(false)
  }

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length) {
      setErrorMessage(null)
      const [file = null] = files
      const error = getFileSizeError(maxFileSize, file?.size)
      if (error) {
        setErrorMessage(error)
      }

      setValue(file)
    }
  }

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    handleDragOverEnd(event)
    const dataTransfer = new DataTransfer()
    // Update the input
    if (inputRef.current) {
      for (const file of event.dataTransfer.files) {
        dataTransfer.items.add(file)
      }
      inputRef.current.files = dataTransfer.files
    }
    handleFileChange(dataTransfer.files)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleDragOverEnd(event)
    handleFileChange(event.target.files)
  }

  const hasFile = !!value

  return (
    <FileInputContainer
      onDrag={preventDefault}
      onDragStart={preventDefault}
      onDragOver={handleDragOverStart}
      onDragEnter={handleDragOverStart}
      onDragEnd={handleDragOverEnd}
      onDragLeave={handleDragOverEnd}
      onDrop={handleDrop}
      className={
        clsx(
          'FileInputContainer',
          isDragOver && 'FileInputContainer-dragOver',
          hasFile && 'FileInputContainer-file',
          !!errorMessage && 'FileInputContainer-error',
          containerClassName,
        )
      }
    >
      <HiddenInput id={inputId} ref={inputRef} onChange={handleOnChange} type="file" />
      <FileInputLabel htmlFor={inputId} className={clsx('FileInputLabel', className)}>
        <FileStatus file={value} blobSize={blobSize} maxFileSize={maxFileSize} errorMessage={errorMessage} dragOver={isDragOver} />
      </FileInputLabel>
    </FileInputContainer>
  )
}