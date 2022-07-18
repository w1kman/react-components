import type { ChangeEvent, DragEvent } from 'react'
import {
  ClearInputButton,
  FileInputContainer,
  FileInputLabel,
  HiddenInput,
  StyledClearIcon,
} from './styled'
import fileSize from 'pretty-bytes'
import { useMemo, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import clsx from 'clsx'
import FileStatus from './FileStatus'
import { useAsyncEffect } from '../../hooks'

export interface FileDataURL {
  name: string
  size: number | null
  originalSize: number | null
  type: string
  dataURL: string
}

interface FileInputProps {
  id?: string
  maxFileSize?: number
  onChangeBlob?: (blob: FileDataURL | null) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  className?: string
  containerClassName?: string
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }
    fileReader.readAsDataURL(file)
  })
}

function getFileSizeError(limit: number, subjectFileSize?: number | null) {
  if (limit && subjectFileSize && subjectFileSize > limit) {
    return `File too large (Max: ${fileSize(limit)})`
  }

  return null
}

export default function FileInput({
  id = 'input-field',
  maxFileSize = 2097152, // 2,024.00 Kb (2MB Binary)
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

  useAsyncEffect(async () => {
    if (!onChangeBlob || value === undefined) {
      return
    }
    setErrorMessage('')
    const dataURL = value ? await fileToDataURL(value) : ''
    const dataURLSize = value ? new Blob([dataURL]).size : null
    const error = getFileSizeError(maxFileSize, dataURLSize)
    setBlobSize(dataURLSize)
    if (error) {
      return setErrorMessage(error)
    }

    return onChangeBlob({
      name: value ? value.name : '',
      type: value ? value.type : '',
      originalSize: value ? value.size : null,
      size: dataURLSize,
      dataURL: dataURL,
    })
  }, [value])

  const preventDefault = (event: DragEvent<HTMLElement> | ChangeEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDragOverStart = (event: DragEvent<HTMLElement>) => {
    preventDefault(event)
    setIsDragOver(true)
  }

  const handleDragOverEnd = (event: DragEvent<HTMLElement> | ChangeEvent<HTMLElement>) => {
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
      return error
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
      const inputEvent = new Event('change', { bubbles: true })
      inputRef.current.dispatchEvent(inputEvent)
    }

    handleFileChange(dataTransfer.files)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleDragOverEnd(event)
    const error = handleFileChange(event.target.files)
    if (!!onChange && !error) {
      onChange(event)
    }
  }

  const resetState = () => {
    setValue(null)
    setErrorMessage(null)
    setBlobSize(null)
  }

  const handleClear = () => {
    const dataTransfer = new DataTransfer()
    // Update the input
    if (!errorMessage && inputRef.current) {
      inputRef.current.files = dataTransfer.files
      const inputEvent = new Event('change', { bubbles: true })
      inputRef.current.dispatchEvent(inputEvent)
    }

    resetState()
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
      className={clsx(
        'FileInputContainer',
        isDragOver && 'FileInputContainer-dragOver',
        hasFile && 'FileInputContainer-file',
        !!errorMessage && 'FileInputContainer-error',
        containerClassName
      )}
    >
      <HiddenInput id={inputId} ref={inputRef} onChange={handleOnChange} type="file" />
      <FileInputLabel htmlFor={inputId} className={clsx('FileInputLabel', className)}>
        <FileStatus
          file={value}
          blobSize={blobSize}
          maxFileSize={maxFileSize}
          errorMessage={errorMessage}
          dragOver={isDragOver}
        />
      </FileInputLabel>
      {hasFile && (
        <ClearInputButton onClick={handleClear}>
          <StyledClearIcon />
        </ClearInputButton>
      )}
    </FileInputContainer>
  )
}
