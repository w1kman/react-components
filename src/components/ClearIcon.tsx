import { forwardRef } from 'react'

const ClearIcon = forwardRef<SVGElement, any>((props, ref) => (
  <svg ref={ref} focusable="false" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    ></path>
  </svg>
))

ClearIcon.displayName = 'ClearIcon'

export default ClearIcon
