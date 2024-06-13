import {
  Avatar,
  Button,
  Divider,
  Navbar,
  Theme
} from "react-daisyui"
import { useChat } from 'ai/react'
import MobileDetect from "mobile-detect"
import { useState, useRef, useCallback, useEffect } from "react"
import * as cookie from 'cookie'
import { useRouter } from "next/router"
import supabaseServerClient from "~/utils/supabase/supabaseServerClient"
import supabaseBrowserClient from "~/utils/supabase/supabaseBrowserClient"
import { fetchAllConversations, fetchAllAgentsInConversation, fetchAllMessagesInConversation } from "~/utils/supabase/queries"
import AgentsPanel from "~/components/AgentsPanel"
import Chat from "~/components/Chat"
import Settings from "~/components/Settings/Settings"
import SideNavigation from "~/components/SideNavigation"
import Stats from "~/components/Stats"
import Prompter from "~/components/Prompter"
import ThemeDropdown from "~/components/ThemeDropdown"
import useMultiAgentManager from "~/hooks/useMultiAgentManager"
import createSystemPrompt from "~/utils/createSystemPrompt"
import generateManualMessages from "~/utils/generateManualMessages"


const Playground = ({ isMobile, user, isSignedIn, conversations }) => {
  const settingsModalRef = useRef(null)
  const statsModalRef = useRef(null)
  const supabase = supabaseBrowserClient()
  const router = useRouter()
  const {
    setModel,
    setCustomInstructions,
    setMaxMessageLength,
    setMaxResponses,
    setTemperature,
    setActiveAgent,
    activeAgent,
    addAgent,
    removeAgent,
    agents,
    setWillAutoRespondToAgent,
    setCannotAutoRespondToAgent,
    conversationType,
    setConversationType,
    setAgent,
    setAgents
  } = useMultiAgentManager()
  const { model, maxMessageLength, maxResponses, customInstructions, temperature, autoRespondTo } = activeAgent
  const [theme, setTheme] = useState('night')
  const [hoverTheme, setHoverTheme] = useState('night')
  const [isHoverTheme, setIsHoverTheme] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [_isLoading, _setIsLoading] = useState(false)
  const [api, setApi] = useState('/api/chat')
  const systemPrompt = createSystemPrompt(customInstructions.promptText)
  const userId = user.id

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    stop,
    isLoading,
    setMessages
  } = useChat({
    api,
    body: {
      model: activeAgent.model,
      temperature: activeAgent.temperature / 100,
      max_tokens: Number(activeAgent.maxMessageLength),
      agents: Object.values(agents),
      userId
    },
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

  const handleSignIn = async () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const toggleDrawerOpen = () => setIsDrawerOpen(prev => !prev)

  return (
    <Theme dataTheme={isHoverTheme ? hoverTheme : theme}>
      <div className="min-h-screen w-screen m-auto flex flex-col">
        <Navbar className="md:pl-96 md:pr-20">
          <Navbar.Start>
            {/* isMobile */ false ? (
              <Button color="ghost" onClick={toggleDrawerOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </Button>
            ) : null}
            <h1>Multi-Agent Playground</h1>
          </Navbar.Start>
          <Navbar.End>
            {isSignedIn ? (
              <>
                <Button
                  color="ghost"
                  onClick={handleSignOut}
                  className="hover:bg-transparent"
                >
                  <span>Sign Out</span>
                </Button>
                <Avatar
                  src={user?.user_metadata.avatar_url || ''}
                  size="xs"
                  shape="circle"
                  className="mr-2"
                />
              </>
            ) : (
              <Button
                color="ghost"
                onClick={handleSignIn}
                className="hover:bg-transparent"
              >
                <span>Sign In</span>
              </Button>
            )}
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
          userId={user.id}
          agents={agents}
          activeAgent={activeAgent}
          model={model}
          setModel={setModel}
          setCustomInstructions={setCustomInstructions}
          ref={settingsModalRef}
          setMaxMessageLength={setMaxMessageLength}
          maxMessageLength={maxMessageLength}
          setMaxResponses={setMaxResponses}
          maxResponses={maxResponses}
          setTemperature={setTemperature}
          temperature={temperature}
          setWillAutoRespondToAgent={setWillAutoRespondToAgent}
          setCannotAutoRespondToAgent={setCannotAutoRespondToAgent}
          autoRespondTo={autoRespondTo}
          api={api}
          setApi={setApi}
          conversationType={conversationType}
          setConversationType={setConversationType}
          isMobile={isMobile}
          addAgent={addAgent}
          removeAgent={removeAgent}
          setActiveAgent={setActiveAgent}
          setAgent={setAgent}
        />
        <main className="flex flex-row flex-1" style={{ maxHeight: 'calc(100vh - 4rem)'}}>
          {!isMobile ? (
            <>
              <SideNavigation
                isDrawerOpen={isDrawerOpen}
                toggleDrawerOpen={toggleDrawerOpen}
                isMobile={isMobile}
                conversations={conversations}
                fetchAllAgentsInConversation={fetchAllAgentsInConversation}
                fetchAllMessagesInConversation={fetchAllMessagesInConversation}
                setMessages={setMessages}
                setAgents={setAgents}
                supabase={supabase}
                userId={userId}
              />
              <AgentsPanel
                agents={Object.values(agents)}
                addAgent={addAgent}
                removeAgent={removeAgent}
                setActiveAgent={setActiveAgent}
                activeAgent={activeAgent}
              />
            </>
          ) : null}
          <section className="flex flex-col w-full">
            <Chat messages={messages} agents={agents} />
            <Prompter
              api={api}
              input={input}
              handleShowSettings={handleShowSettings}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              stop={stop}
              isLoading={isLoading || _isLoading}
              agents={agents}
              generateManualMessages={generateManualMessages}
              setMessages={setMessages}
              setIsLoading={_setIsLoading}
              activeAgent={activeAgent}
              isMobile={isMobile}
              userId={userId}
              setInput={setInput}
              messages={messages}
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
  const supabase = supabaseServerClient(context)
  let userData
  let isSignedIn = false
  let conversations = []
  if (!userData) {
    const { data: { user } = {}, error } = await supabase.auth.getUser()
    userData = user
    const { aud, id } = userData ?? {}

    if (error) {
      console.error('Error fetching user:', error)
    } else if (id) {
      conversations = await fetchAllConversations({ supabase, user_id: id })
    }
    isSignedIn = aud === 'authenticated'
  }

  return {
    props: {
      isMobile: getIsMobile(context),
      user: userData ?? {},
      isSignedIn,
      conversations: conversations ?? []
    },
    // return with code param in url removed

  };
}

export default Playground
