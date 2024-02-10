import React from 'react'
import FormFieldBlock from '../FormFieldBlock'
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
        <FormFieldBlock
          label="Auto-respond"
          description="Automatically respond to other agents"
          checked={activeAgent.autoRespond}
        />
        {/* SVG animation of a simple cyclic graph with 2 nodes and 2 curved edges connecting them together */}
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" version="1.1">
          <defs>
            <clipPath id="clip">
              <circle cx="50" cy="50" r="20"/>
              <circle cx="150" cy="50" r="20"/>
            </clipPath>
          </defs>
          <path d="M 60,40 Q 100,0 140,40" stroke="#48bb78" fill="none" stroke-width="2" clip-path="url(#clip)"/>
          <path d="M 60,60 Q 100,100 140,60" stroke="#9f7aea" fill="none" stroke-width="2" clip-path="url(#clip)"/>
          <circle cx="50" cy="50" r="20" stroke="#2d3748" stroke-width="2" fill="#f56565"/>
          <circle cx="150" cy="50" r="20" stroke="#2d3748" stroke-width="2" fill="#4299e1"/>
        </svg>


<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" version="1.1">
  <circle cx="150" cy="50" r="20" stroke="#2d3748" stroke_width="2" fill="#4299e1"/>
  <circle cx="100" cy="150" r="20" stroke="#2d3748" stroke_width="2" fill="#4299e1"/>
  <circle cx="200" cy="150" r="20" stroke="#2d3748" stroke_width="2" fill="#4299e1"/>
  <circle cx="50" cy="250" r="20" stroke="#2d3748" stroke_width="2" fill="#4299e1"/>
  <circle cx="125" cy="250" r="20" stroke="#2d3748" stroke_width="2" fill="#4299e1"/>
  <circle cx="175" cy="250" r="20" stroke="#2d3748" stroke_width="2" fill="#4299e1"/>
  <circle cx="250" cy="250" r="20" stroke="#2d3748" stroke_width="2" fill="#4299e1"/>
  <path d="M 150,70 L 100,130" stroke="#48bb78" stroke_width="2"/>
  <path d="M 150,70 L 200,130" stroke="#48bb78" stroke_width="2"/>
  <path d="M 100,170 L 50,230" stroke="#48bb78" stroke_width="2"/>
  <path d="M 100,170 L 125,230" stroke="#48bb78" stroke_width="2"/>
  <path d="M 200,170 L 175,230" stroke="#48bb78" stroke_width="2"/>
  <path d="M 200,170 L 250,230" stroke="#48bb78" stroke_width="2"/>
</svg>





      </section>
    </div>
  )
}

export default AgentBehaviourSettings
