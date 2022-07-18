import { useEffect } from 'react'

export function useAsyncEffect(asyncCallback: () => Promise<void>, deps: any[]) {
  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    asyncCallback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps])
}
