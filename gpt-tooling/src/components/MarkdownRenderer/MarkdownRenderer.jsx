import React from 'react'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

const MarkdownRenderer = ({ children }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      className="prose"
    >{children}</Markdown>
  )
}

MarkdownRenderer.displayName = 'MarkdownRenderer'

export default MarkdownRenderer