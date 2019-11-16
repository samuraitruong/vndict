import React, { useEffect, useRef, useCallback } from 'react'
import { Typography } from '@material-ui/core'
export interface IInterceptionProps {
  html: string;
  onLinkClick: (e: any) => any;
  onWordClick?: (e: string) => void;
}
export function LinkInterceptor({ html, onLinkClick, onWordClick }: IInterceptionProps) {
  const ref = useRef(null)
  const listeners = useRef([])
  const wordDdCLickHandle = useCallback(() => {
    let text = "";
    const doc = document as any;

    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (doc.selection && doc.selection.type !== "Control") {
      text = doc.selection.createRange().text;
    }
    if (text && onWordClick) {
      onWordClick(text);
    }
  }, [onWordClick]);

  useEffect(
    () => {
      listeners.current.push(ref.current);
      ref.current.addEventListener("dblclick", wordDdCLickHandle)
      const links: HTMLElement[] = Array.from(ref.current.querySelectorAll('a'))
      links.forEach(node => {
        node.addEventListener('click', onLinkClick)
        listeners.current.push(node)
      })

      return () => {
        listeners.current.forEach(node => {
          node.removeEventListener('click', onLinkClick);
          node.removeEventListener('dblclick', wordDdCLickHandle);
        });
        listeners.current = []
      }
    },
    [html, onLinkClick, onWordClick, wordDdCLickHandle]
  )

  return <Typography ref={ref} variant="body1" component="article" dangerouslySetInnerHTML={{ __html: html }}></Typography>
}