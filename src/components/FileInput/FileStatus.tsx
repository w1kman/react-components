import {
  ErrorMessage,
  MutedText,
  StyledErrorIcon,
  StyledUploadIcon,
  StyledFileIcon,
} from './styled'
import FileMeta from './FileMeta'

interface FileStatusProps {
  file: File | null | undefined
  blobSize?: number | null
  maxFileSize: number
  errorMessage?: string | null
  dragOver: boolean
}

export default function FileStatus({ file, errorMessage, blobSize, dragOver }: FileStatusProps) {
  const fileSize = blobSize ? blobSize : file?.size
  if (errorMessage) {
    return (
      <>
        <StyledErrorIcon />
        <FileMeta name={file?.name} size={fileSize} />
        <ErrorMessage>Error: {errorMessage}</ErrorMessage>
      </>
    )
  }
  if (file) {
    return (
      <>
        <StyledFileIcon />
        <FileMeta name={file?.name} size={fileSize} />
        <MutedText>
          {dragOver
            ? 'Drop file to replace current file'
            : 'Drag a new file to replace (or click to browse)'}
        </MutedText>
      </>
    )
  }

  return (
    <>
      <StyledUploadIcon />
      <MutedText>{dragOver ? 'Drop file to upload' : 'Drag file here to upload'}</MutedText>
      <MutedText>(or click to browse)</MutedText>
    </>
  )
}
