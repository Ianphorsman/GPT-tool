import React from 'react'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const MarkdownRenderer = ({ children }) => {
  return (
    <Markdown

      rehypePlugins={[rehypeHighlight]}
    >{children}</Markdown>
  )
}

MarkdownRenderer.displayName = 'MarkdownRenderer'

export default MarkdownRenderer