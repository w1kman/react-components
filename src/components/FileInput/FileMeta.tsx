import prettyBytes from 'pretty-bytes'

interface FileMetaProps {
  name?: string
  size?: number
}

export default function FileMeta({name = '', size = 0}: FileMetaProps) {
  return (
      <span>{name} ({prettyBytes(size)})</span>
  )
}