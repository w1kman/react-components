import { forwardRef } from 'react'

const SimCardError = forwardRef<SVGElement, any>((props, ref) => (
  <svg ref={ref} focusable="false" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path
      fill="currentColor"
      d="M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 15h-2v-2h2v2zm0-4h-2V8h2v5z"
    />
  </svg>
))

SimCardError.displayName = 'SimCardError'

export default SimCardError
