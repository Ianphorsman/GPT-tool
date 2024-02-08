import {
  Button,
  Divider,
  Navbar,
  Theme,
  Tooltip
} from "react-daisyui"
import { useChat } from 'ai/react'
import MobileDetect from "mobile-detect"
import { useState, useRef, useCallback, useEffect } from "react"
import AgentsPanel from "~/components/AgentsPanel"
import Chat from "~/components/Chat"
import Settings from "~/components/Settings/Settings"
import SideNavigation from "~/components/SideNavigation"
import Stats from "~/components/Stats"
import Prompter from "~/components/Prompter"
import ThemeDropdown from "~/components/ThemeDropdown"
import useMultiAgentManager from "~/hooks/useMultiAgentManager"
import createSystemPrompt from "~/utils/createSystemPrompt"

const Playground = ({ isMobile }) => {
  const settingsModalRef = useRef(null)
  const statsModalRef = useRef(null)
  const {
    model,
    setModel,
    customInstructions,
    setCustomInstructions,
    setMaxMessageLength,
    maxMessageLength,
    setMaxResponses,
    maxResponses,
    setActiveAgent,
    activeAgent,
    addAgent,
    removeAgent
  } = useMultiAgentManager()
  const [theme, setTheme] = useState('night')
  const [hoverTheme, setHoverTheme] = useState('night')
  const [isHoverTheme, setIsHoverTheme] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
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

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('daisyui-theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const handleShowSettings = useCallback(() => {
    settingsModalRef.current?.showModal()
  }, [])

  const handleShowStats = useCallback(() => {
    statsModalRef.current?.showModal()
  }, [])

  const toggleDrawerOpen = () => setIsDrawerOpen(prev => !prev)

  return (
    <Theme dataTheme={isHoverTheme ? hoverTheme : theme}>
      <div className="min-h-screen m-auto flex flex-col">
        <Navbar className="md:pl-80 md:pr-20">
          <Navbar.Start>
            {isMobile ? (
              <Button onClick={toggleDrawerOpen}>

              </Button>
            ) : null}
            <h1>GPT Playground</h1>
          </Navbar.Start>
          <Navbar.End>
            <Tooltip message="Usage Stats" position="bottom">
              <Button onClick={handleShowStats} color="ghost">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-secondary">
                  <path fill-rule="evenodd" d="M6.32 1.827a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V4.757c0-1.47 1.073-2.756 2.57-2.93ZM7.5 11.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H8.25Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75H8.25Zm1.748-6a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.007Zm-.75 3a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.007Zm1.754-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.008Zm1.748-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-8.25-6A.75.75 0 0 1 8.25 6h7.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75v-.75Zm9 9a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-2.25Z" clip-rule="evenodd" />
                </svg>
              </Button>
            </Tooltip>
            <ThemeDropdown
              theme={theme}
              setTheme={setTheme}
              setHoverTheme={setHoverTheme}
              setIsHoverTheme={setIsHoverTheme}
            />
          </Navbar.End>
        </Navbar>
        <Divider vertical color="neutral" className="m-0 h-0.5" />
        <Stats handleShowStats={handleShowStats} ref={statsModalRef} />
        <Settings
          model={model}
          setModel={setModel}
          setCustomInstructions={setCustomInstructions}
          ref={settingsModalRef}
          setMaxMessageLength={setMaxMessageLength}
          maxMessageLength={maxMessageLength}
          setMaxResponses={setMaxResponses}
          maxResponses={maxResponses}
        />
        <main className="flex flex-row flex-1">
          <SideNavigation isDrawerOpen={isDrawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
          <AgentsPanel
            addAgent={addAgent}
            removeAgent={removeAgent}
            setActiveAgent={setActiveAgent}
            activeAgent={activeAgent}
          />
          <section className="flex flex-col w-full">
            <Chat messages={messages} />
            <Prompter
              input={input}
              handleShowSettings={handleShowSettings}
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

const getIsMobile = (context) => {
  const md = new MobileDetect(context.req.headers["user-agent"])

  return Boolean(md.mobile())
}

export async function getServerSideProps(context) {
  return {
    props: {
      isMobile: getIsMobile(context)
    }
  };
}

export default Playground
