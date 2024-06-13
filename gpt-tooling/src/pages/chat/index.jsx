import MobileDetect from "mobile-detect"
import { fetchAllConversations } from "~/utils/supabase/queries"
import supabaseServerClient from "~/utils/supabase/supabaseServerClient"
import Playground from "./playground"

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
    }
  };
}

export default Playground