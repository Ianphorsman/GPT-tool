import React from 'react'
import RangeBlock from '../RangeBlock'
import { Divider } from 'react-daisyui'

const AgentBehaviourSettings = ({
  activeAgent,
  maxResponses,
  setMaxResponses
}) => {
  const { id } = activeAgent
  return (
    <div className="flex flex-row">
      <section className="flex-1">
        <RangeBlock
          label="Max responses"
          size="xs"
          color="ghost"
          onChange={(e) => setMaxResponses(id, e.target.value)}
          min={1}
          max={10}
          step={maxResponses}
        />
      </section>
      <Divider horizontal />
      <section className="flex-1">
        
      </section>
    </div>
  )
}

export default AgentBehaviourSettings
