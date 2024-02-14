import React from 'react'
import FormFieldBlock from '../FormFieldBlock'
import { Divider } from 'react-daisyui'

const ConversationSettings = () => {
  return (
    <div className="flex flex-row mt-4">
      <section className="flex-1 flex flex-col items-center justify-center gap-4">
        <p>The goal was to eventually expose an intuitive yet flexible enough interface that allows users to orchestrate conversational flows among multiple agents.</p>
        <p>After some research and consideration, I've decided that such tooling already exists. Will instead focus on supporting the ability to upload and store Langflow and Rivet agent flows.</p>
      </section>
      <Divider horizontal />
      <section className="flex-1 flex flex-col gap-4">
        <FormFieldBlock
          label="Round robin (coming soon)"
          description="Round robin will cycle through the agents in the conversation."
          checked={false}
          disabled
        />
        <FormFieldBlock
          label="Delegator tree (coming soon)"
          description="One agent will maintain the main conversation and delegate tasks to other agents, each with separate conversation threads."
          checked={false}
          disabled
        />
      </section>
    </div>
  )
}

ConversationSettings.displayName = 'ConversationSettings'

export default ConversationSettings
