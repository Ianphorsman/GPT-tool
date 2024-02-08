import React from 'react'
import { Button, Join, Tooltip } from 'react-daisyui'

const AgentsPanel = ({
  agents = [],
  activeAgent,
  setActiveAgent,
  addAgent
}) => {
  return (
    <section className="w-16 border-x-2 border-neutral flex">
      {agents.length > 0 ? (
        <Join vertical className="m-0 rounded-none self-start">
          {agents.map(({ name, initials, id }) => (
            <Tooltip key={id} message={name} position="right">
              <Button
                shape="square"
                color={id === activeAgent.id ? "accent" : "primary"}
                className="m-0 join-item"
                onClick={() => setActiveAgent(id)}
              >
                {initials}
              </Button>
            </Tooltip>
          ))}
        </Join>
      ) : null}
      <Join vertical className="m-0 rounded-none self-end">
        <Tooltip message="Add agent" position="top">
          <Button
            shape="square"
            className="m-0 join-item"
            onClick={() => addAgent()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Button>
        </Tooltip>
      </Join>
    </section>
  )
}

export default AgentsPanel
