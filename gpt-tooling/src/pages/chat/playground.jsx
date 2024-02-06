import {
  Theme,
  Navbar
} from "react-daisyui"
import { useChat } from 'ai/react'
import { useState, useRef, useCallback } from "react"
import Chat from "~/components/Chat"
import Settings from "~/components/Settings/Settings"
import Prompter from "~/components/Prompter"
import ThemeDropdown from "~/components/ThemeDropdown"
import createSystemPrompt from "~/utils/createSystemPrompt"

const Playground = () => {
  const settingsModalRef = useRef(null)
  const [model, setModel] = useState('gpt-3.5-turbo')
  const [customInstructions, setCustomInstructions] = useState('')
  const [theme, setTheme] = useState('night')
  const [hoverTheme, setHoverTheme] = useState('night')
  const [isHoverTheme, setIsHoverTheme] = useState(false)
  const systemPrompt = createSystemPrompt(customInstructions)
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    isLoading
  } = useChat({
    body: { model },
    ...systemPrompt && { initialMessages: [systemPrompt] }
  })

  const handleShow = useCallback(() => {
    settingsModalRef.current?.showModal()
  }, [])

  return (
    <Theme dataTheme={isHoverTheme ? hoverTheme : theme}>
      <div className="min-h-screen m-auto flex flex-col">
        <Navbar className="pl-80 pr-20">
          <Navbar.Start>
            <h1>GPT Playground</h1>
          </Navbar.Start>
          <Navbar.End>
            <ThemeDropdown
              theme={theme}
              setTheme={setTheme}
              setHoverTheme={setHoverTheme}
              setIsHoverTheme={setIsHoverTheme}
            />
          </Navbar.End>
        </Navbar>
        <Settings
          model={model}
          setModel={setModel}
          setCustomInstructions={setCustomInstructions}
          ref={settingsModalRef}
        />
        <main className="flex flex-row flex-1">
          <section className="border-r border-r-base-200 w-80 p-4">
            <h2>Conversations</h2>
          </section>
          <section className="flex flex-col w-full">
            <Chat messages={messages} />
            <Prompter
              input={input}
              handleShow={handleShow}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              stop={stop}
              isLoading={isLoading}
            />
          </section>
        </main>
      </div>
    </Theme>
  )
}

export default Playground
