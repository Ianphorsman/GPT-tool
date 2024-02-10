import React from 'react'
import { Button, Join, Tooltip } from 'react-daisyui'

const AgentsPanel = ({
  agents = [],
  activeAgent,
  setActiveAgent,
  addAgent,
  setView
}) => {
  return (
    <section className="w-16 border-x-2 border-neutral flex flex-col gap-0 justify-between">
      <div className="m-0">
        {agents.length > 0 ? (
          <Join vertical className="m-0 rounded-none">
            {agents.map(({ name, initials, id }) => (
              <Tooltip key={id} message={name} position="right">
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
        <Tooltip message="Add agent" position="right">
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
        <Tooltip message="Flow Diagram" position="right">
          <Button
            shape="square"
            className="m-0 join-item"
            onClick={() => setView('flow')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </Button>
        </Tooltip>
      </Join>
    </section>
  )
}

export default AgentsPanel
