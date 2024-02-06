import React, { useState } from 'react'
import { Dropdown } from 'react-daisyui'

const themes = ['night', 'dracula', 'retro', 'light', 'dark']

const ThemeDropdown = ({ setTheme, setHoverTheme, setIsHoverTheme }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onMouseEnter = (e) => {
    setHoverTheme(e.target.text)
    setIsHoverTheme(true)
  }
  const onClick = (e) => {
    setTheme(e.target.text)
    setIsHoverTheme(false)
    setIsOpen(false)
  }
  return (
    <Dropdown hover open={isOpen}>
      <Dropdown.Toggle>Theme</Dropdown.Toggle>
      <Dropdown.Menu>
        {themes.map((themeName) => (
          <Dropdown.Item
            key={themeName}
            onMouseEnter={onMouseEnter}
            onMouseLeave={() => setIsHoverTheme(false)}
            onClick={onClick}
          >
            {themeName}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ThemeDropdown
