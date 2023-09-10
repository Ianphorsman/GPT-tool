import Conversation from "~/components/Conversation"
import Header from "~/components/PageContainer/Header"
import Main from '~/components/PageContainer/Main'
import SideNavigation from "~/components/SideNavigation"
import { Theme } from "react-daisyui"

const Playground = () => {
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
