import {
  Theme
} from "react-daisyui"
import { useChat } from 'ai/react'
import Chat from "~/components/Chat"
import Settings from "~/components/Settings/Settings"
import Prompter from "~/components/Prompter"
import { useState, useRef, useCallback } from "react"

const Playground = () => {
  const settingsModalRef = useRef(null)
  const [model, setModel] = useState('gpt-3.5-turbo')
  const { messages, input, handleInputChange, handleSubmit } = useChat({ body: { model }})

  const handleShow = useCallback(() => {
    settingsModalRef.current?.showModal()
  }, [])

  return (
    <Theme dataTheme="night">
      <div className="min-h-screen m-auto flex flex-col">
        <header className="flex flex-col p-4 border-b border-b-base-200 pl-80">
          <h1>GPT Playground</h1>
        </header>
        <Settings
          model={model}
          setModel={setModel}
          ref={settingsModalRef}
        />
        <main className="flex flex-row flex-1">
          <section className="border-r border-r-base-200 w-80 p-4">
            <h2>Side Nav</h2>
          </section>
          <section className="flex flex-col w-full">
            <Chat messages={messages} />
            <Prompter
              input={input}
              handleShow={handleShow}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
            />
          </section>
        </main>
      </div>
    </Theme>
  )
}

export default Playground
