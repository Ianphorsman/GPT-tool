import React from 'react'
import { Modal } from 'react-daisyui'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabaseClient from '~/utils/supabase/supabaseBrowserClient'

const OAuth = ({ authRef }) => {
  const supabase = supabaseClient()
  return (
    <Modal ref={authRef} backdrop>
      <Modal.Body>
        <Auth
          supabaseClient={supabase}
          providers={['google']}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          redirectTo={process.env.NEXT_PUBLIC_BASE_URL}
          onlyThirdPartyProviders
        />
      </Modal.Body>
    </Modal>
  )
}

export default OAuth
