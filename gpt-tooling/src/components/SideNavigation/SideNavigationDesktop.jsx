import React from 'react'
import { Button } from 'react-daisyui'

const SideNavigationDesktop = ({
  api,
  setApi
}) => {
  return (
    <section className="w-80 p-4 text-center">
      <p>Conversations</p>
      <Button
        className="w-full p-2 my-2 bg-primary-500 hover:bg-primary-600 rounded-md"
        onClick={() => setApi('/api/langchain')}
      >Tavily</Button>
    </section>
  )
}

export default SideNavigationDesktop