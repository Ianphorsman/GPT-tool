import React, { useState } from 'react'
import { Button, Divider, Link, Select, Textarea, Toggle } from 'react-daisyui'
import RangeBlock from '../RangeBlock'
import { MODEL_OPTIONS } from "~/constants"

const GenerationSettings = ({
  model,
  setModel,
  setCustomInstructions,
  setMaxMessageLength,
  maxMessageLength,
  setTemperature,
  temperature,
  activeAgent,
  api,
  setApi
}) => {
  const [_customInstructions, _setCustomInstructions] = useState(activeAgent.customInstructions || '')
  const [hasMadeChanges, setHasMadeChanges] = useState(false)
  const id = activeAgent.id

  const onApplyChangesClick = () => {
    setCustomInstructions(id, _customInstructions[id])
    setHasMadeChanges(false)
  }

  const onInputChange = (e) => {
    _setCustomInstructions({ [id]: e.target.value })
    setHasMadeChanges(!!e.target.value)
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-1 flex-col justify-center items-stretch gap-3">
        <Textarea
          label="Custom Instructions"
          onChange={onInputChange}
          placeholder={"Type your custom instructions here..."}
          className="flex-1"
          value={_customInstructions[id] || activeAgent.customInstructions || ''}
        />
        <Button onClick={onApplyChangesClick} disabled={!hasMadeChanges}>Save</Button>
      </div>
      <Divider horizontal />
      <div className="flex flex-1 flex-col justify-center items-stretch gap-4">
        <Select onChange={(e) => setModel(id, e.target.value)}>
          {MODEL_OPTIONS.map(({ name, access }) => {
            return (
              <Select.Option value={name} selected={model === name} key={name} disabled={access !== 'free'}>
                {name} {access === 'coming soon' ? access : null}
              </Select.Option>
            )
          })}
        </Select>
        <RangeBlock
          label="Max message length"
          size="xs"
          color="ghost"
          onChange={(e) => setMaxMessageLength(id, e.target.value)}
          min={1}
          max={2000}
          step={maxMessageLength}
        />
        <RangeBlock
          label="Temperature"
          size="xs"
          color="ghost"
          onChange={(e) => setTemperature(id, e.target.value)}
          min={0}
          max={200}
          step={temperature}
        />
        <label>Use Tavily for Realtime Data <Link className="text-sm" href="https://docs.tavily.com/docs/tavily-api/introduction" target="_blank" color="primary">Learn more</Link></label>
        <Toggle
          color="primary"
          onClick={() => setApi(prev => prev === '/api/langchain' ? '/api/chat' : '/api/langchain')}
          checked={api === '/api/langchain'}
        />
        <label>Round Robin Mode<span className="text-sm prose block">Agents will take turns auto-responding to each other</span></label>
        <Toggle
          color="primary"
          onClick={() => setApi(prev => prev === '/api/graph' ? '/api/chat' : '/api/graph')}
          checked={api === '/api/graph'}
        />
      </div>
    </div>
  )
}

export default GenerationSettings
