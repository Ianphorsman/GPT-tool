import React from 'react'
import { Button, Join, Tooltip } from 'react-daisyui'

const AgentsPanel = ({
  agents = [],
  activeAgent,
  setActiveAgent,
  addAgent
}) => {
  return (
    <section className="w-16 border-x-2 border-neutral flex flex-col gap-0 justify-between">
      <div className="m-0">
        {agents.length > 0 ? (
          <Join vertical className="m-0 rounded-none">
            {agents.map(({ name, initials, id }) => (
              <Tooltip key={id} message={name} position="bottom">
                <Button
                  shape="square"
                  color={id === activeAgent.id ? "neutral" : "ghost"}
                  className="m-0 join-item"
                  onClick={() => setActiveAgent(id)}
                >
                  {initials}
                </Button>
              </Tooltip>
            ))}
          </Join>
        ) : null}
      </div>
      <Join vertical className="m-0 rounded-none">
        <Tooltip message="Add agent" position="top">
          <Button
            shape="square"
            className="m-0 join-item"
            onClick={() => addAgent(agents.length + 1, { id: agents.length + 1, name: `Agent${agents.length + 1}`, initials: `A${agents.length + 1}` })}
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
