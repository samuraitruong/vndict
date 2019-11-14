import React from 'react'

type ApiProviderProps = {
  kind: RequestKind,
  path: string
}

enum RequestKind {
  HTML = 'html',
  VOICE = 'voice'
}

const RESOURCE_ROOT = 'https://samuraitruong.github.io/open-vn-en-dict'

const useResource = ({ kind, path }: ApiProviderProps) => {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if(kind && path) {
      const url = `${RESOURCE_ROOT}/${kind}/${path}`
      if (kind === RequestKind.HTML) {
        (async () => {
          await fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError)
        })()
      }
      if (kind === RequestKind.VOICE) {
        try {
          const audio = new Audio(url)
          setData(audio)
        }
        catch(error) {
          setError(error)
        }
      }
    }
  }, [kind, path])

  return { data, error }
}

export default useResource