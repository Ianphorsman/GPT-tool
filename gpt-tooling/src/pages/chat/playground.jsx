import Conversation from "~/components/Conversation"
import Header from "~/components/PageContainer/Header"
import Main from '~/components/PageContainer/Main'

const Playground = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <p>GPT Playground</p>
      </Header>
      <Main>
        <Conversation />
      </Main>
    </div>
  )
}

export default Playground
