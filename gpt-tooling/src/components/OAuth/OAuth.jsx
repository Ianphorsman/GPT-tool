import React from 'react'
import { Button, Modal } from 'react-daisyui'
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
        />
      </Modal.Body>
    </Modal>
  )
}

export default OAuth
