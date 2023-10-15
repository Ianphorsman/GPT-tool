import {
  Button,
  Input,
  Join,
  Theme
} from "react-daisyui"
import { useChat } from 'ai/react'
import Conversation from "~/components/Conversation"
import Header from "~/components/PageContainer/Header"
import Main from '~/components/PageContainer/Main'
import SideNavigation from "~/components/SideNavigation"
import Chat from "~/components/Chat"

const Playground = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  return (
    <Theme dataTheme="night">
      <div className="min-h-screen m-auto flex flex-col">
        <header className="flex flex-col p-4 border-b border-b-base-200 pl-80">
          <h1>GPT Playground</h1>
        </header>
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
                <Input
                  className="join-item border border-base-200 rounded-l-full max-w-prose flex-1"
                  color="primary"
                  placeholder="Type your prompt here..."
                  value={input}
                  onChange={handleInputChange}
                />
                <Button
                  className="join-item rounded-r-full"
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
  return (
    <Theme dataTheme="night">
      <div className="flex flex-col min-h-screen">
        <Header>
          <p>GPT Playground</p>
        </Header>
        <Main styles="flex flex-row">
          <SideNavigation styles="" />
          <Conversation />
        </Main>
      </div>
    </Theme>
  )
}

export default Playground
