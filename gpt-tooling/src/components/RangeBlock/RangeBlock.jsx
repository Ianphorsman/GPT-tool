import React from 'react'
import { Range } from 'react-daisyui'

const RangeBlock = ({
  label,
  value,
  onChange,
  size = 'xs',
  color = 'ghost'
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="range" className="text-sm">{label}</label>
      <Range
        size={size}
        color={color}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default RangeBlock
