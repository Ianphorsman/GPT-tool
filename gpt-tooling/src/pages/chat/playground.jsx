import Conversation from "~/components/Conversation"
import Header from "~/components/PageContainer/Header"
import Main from '~/components/PageContainer/Main'

const Playground = () => {
  return (
    <>
      <Header>
        <p>GPT Playground</p>
      </Header>
      <Main>
        <Conversation />
      </Main>
    </>
  )
}

export default Playground
