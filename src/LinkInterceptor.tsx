import React, { useEffect, useRef } from 'react'
import { Typography } from '@material-ui/core'

export function LinkInterceptor({ html, onLinkClick = () => { } }: { html: string, onLinkClick: (e: any) => void }) {
  const ref = useRef(null)
  const listeners = useRef([])

  useEffect(
    () => {
      const links: HTMLElement[] = Array.from(ref.current.querySelectorAll('a'))
      links.forEach(node => {
        node.addEventListener('click', onLinkClick)
        listeners.current.push(node)
      })

      return () => {
        listeners.current.forEach(node =>
          node.removeEventListener('click', onLinkClick)
        )
        listeners.current = []
      }
    },
    [html, onLinkClick]
  )

  return <Typography ref={ref} variant="body1" component="body" dangerouslySetInnerHTML={{ __html: html }}></Typography>
}