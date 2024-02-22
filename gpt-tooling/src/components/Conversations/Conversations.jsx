import React from 'react'
import { SignedIn } from '@clerk/nextjs'

const Conversations = () => {
  return (
    <SignedIn>
      <h1>Conversations</h1>
    </SignedIn>
  )
}

export default Conversations
