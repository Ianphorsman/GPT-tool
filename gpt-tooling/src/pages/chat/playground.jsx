import {
  Button,
  Input,
  Join,
  Theme
} from "react-daisyui"
import { useChat } from 'ai/react'
import Chat from "~/components/Chat"
import Settings from "~/components/Settings/Settings"
import { useState, useRef, useCallback } from "react"

const Playground = () => {
  const settingsModalRef = useRef(null)
  const [model, setModel] = useState('gpt-3.5-turbo')
  const { messages, input, handleInputChange, handleSubmit } = useChat({ body: { model }})

  const handleShow = useCallback(() => {
    settingsModalRef.current?.showModal()
  }, [settingsModalRef])

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
            <form
              className="flex flex-row justify-center p-4"
              onSubmit={handleSubmit}
            >
              <Join className="flex flex-row w-full justify-center">
                <Button
                  className="join-item rounded-l-full"
                  color="secondary"
                  onClick={handleShow}
                >
                  Settings
                </Button>
                <Input
                  className="join-item max-w-prose flex-1"
                  color="secondary"
                  placeholder="Type your prompt here..."
                  value={input}
                  onChange={handleInputChange}
                />
                <Button
                  className="join-item rounded-r-full"
                  color="secondary"
                  type="submit"
                >
                  Chat
                </Button>
              </Join>
            </form>
          </section>
        </main>
      </div>
    </Theme>
  )
}

export default Playground
