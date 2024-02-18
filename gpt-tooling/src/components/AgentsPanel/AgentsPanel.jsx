import React, { useState } from 'react'
import { Button, Join, Tooltip } from 'react-daisyui'
import { PRE_BUILT_SETUPS } from '~/constants'

const AgentsPanel = ({
  agents = [],
  activeAgent,
  setActiveAgent,
  addAgent
}) => {
  const [view, setView] = useState('pre-built')
  return (
    <section className="w-16 border-x-2 border-neutral flex flex-col gap-0 justify-between">
      <div className="m-0">
        {agents.length > 0 && view === 'custom' ? (
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
        {view === 'pre-built' ? (
          <Join vertical className="m-0 rounded-none">
            {PRE_BUILT_SETUPS.map(({ graphId, description }, idx) => (
              <Tooltip key={graphId} message={description} position="right">
                <Button
                  shape="square"
                  className="m-0 join-item"
                  onClick={() => setActiveAgent(graphId)}
                >
                  {`PB ${idx + 1}`}
                </Button>
              </Tooltip>
            ))}
          </Join>
        ) : null}
      </div>
      <Join vertical className="m-0 rounded-none">
        {view === 'custom' ? (
          <>
            <Tooltip message="Add Agent" position="right">
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
            <Tooltip message="Use Prebuilt Setups" position="right">
              <Button
                shape="square"
                className="m-0 join-item"
                onClick={() => setView('pre-built')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
                </svg>
              </Button>
            </Tooltip>
            </>
        ) : null}
        {view === 'pre-built' ? (
          <Tooltip message="Use Custom Setups (stay tuned)" position="right">
            <Button
              shape="square"
              className="m-0 join-item"
              onClick={() => setView('custom')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </Button>
          </Tooltip>
        ) : null}
      </Join>
    </section>
  )
}

export default AgentsPanel
