import React, { useState } from 'react'
import { Button, Divider, Link, Select, Textarea, Toggle } from 'react-daisyui'
import supabaseClient from '~/utils/supabase/supabaseBrowserClient'
import { upsertAgentWithSystemPrompt } from "~/utils/supabase/mutations"
import { MODEL_OPTIONS } from "~/constants"
import RangeBlock from '../RangeBlock'

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
  setApi,
  isMobile,
  userId
}) => {
  const [_customInstructions, _setCustomInstructions] = useState(activeAgent.customInstructions.promptText || '')
  const [hasMadeChanges, setHasMadeChanges] = useState(false)
  const id = activeAgent.id
  const supabase = supabaseClient()

  const onApplyChangesClick = async () => {
    setCustomInstructions(id, _customInstructions[id])
    /*upsertAgentWithSystemPrompt({
      supabase,
      system_prompt_id: activeAgent.customInstructions.id,
      user_id: userId,
      agent_id: id,
      title: _customInstructions[id].substr(0, 25),
      prompt_text: _customInstructions[id],
      agent: {
        model: activeAgent.model,
        max_message_length: Number(activeAgent.maxMessageLength),
        temperature: Number(activeAgent.temperature) / 100,
        initials: activeAgent.initials,
        name: activeAgent.name//,
        //description: activeAgent.description
      }
    })*/
    setHasMadeChanges(false)
  }

  const onInputChange = (e) => {
    _setCustomInstructions({ [id]: e.target.value })
    setHasMadeChanges(!!e.target.value)
  }

  return (
    <div className="flex flex-row flex-wrap">
      <div className={`flex flex-1 flex-col justify-center items-stretch gap-3 ${isMobile ? 'mb-8' : ''}`}>
        <Textarea
          label="Custom Instructions"
          onChange={onInputChange}
          placeholder={"Type your custom instructions here..."}
          className="flex-1"
          value={_customInstructions[id] || activeAgent.customInstructions.promptText || ''}
        />
        <Button onClick={onApplyChangesClick} disabled={!hasMadeChanges}>Save</Button>
      </div>
      <Divider responsive={isMobile} horizontal={!isMobile} />
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
          label="Max Tokens in Response"
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
          color="accent"
          onClick={() => setApi(prev => prev === '/api/langchain' ? '/api/chat' : '/api/langchain')}
          checked={api === '/api/langchain'}
        />
        <label>Round Robin Mode<span className="text-sm prose block">Agents will take turns auto-responding to each other</span></label>
        <Toggle
          color="accent"
          onClick={() => setApi(prev => prev === '/api/graph' ? '/api/chat' : '/api/graph')}
          checked={api === '/api/graph'}
        />
      </div>
    </div>
  )
}

export default GenerationSettings
