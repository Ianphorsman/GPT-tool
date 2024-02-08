import React from 'react'
import { Range, Input } from 'react-daisyui'

const RangeBlock = ({
  label,
  step,
  onChange,
  size = 'xs',
  color = 'ghost',
  min,
  max
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <label htmlFor="range" className="text-sm">{label}</label>
        <Input
          size="xs"
          color="ghost"
          value={step}
          onChange={onChange}
        />
      </div>
      <Range
        size={size}
        color={color}
        value={step}
        onChange={onChange}
        min={min}
        max={max}
      />
    </div>
  )
}

export default RangeBlock
