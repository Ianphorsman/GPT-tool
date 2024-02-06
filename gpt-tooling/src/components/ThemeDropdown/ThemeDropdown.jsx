import React, { useState } from 'react'
import { Dropdown } from 'react-daisyui'

const themes = ['night', 'dracula', 'retro', 'light', 'dark']

const ThemeDropdown = ({ theme, setTheme, setHoverTheme, setIsHoverTheme }) => {
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
      <Dropdown.Toggle className="btn btn-ghost" button={false}>Theme</Dropdown.Toggle>
      <Dropdown.Menu>
        {themes.map((themeName) => (
          <Dropdown.Item
            key={themeName}
            onMouseEnter={onMouseEnter}
            onMouseLeave={() => setIsHoverTheme(false)}
            onClick={onClick}
            className={theme === themeName ? 'bg-primary' : ''}
          >
            <p className="flex flex-row gap-2"><span>{theme === themeName ? '✓ ' : ''}</span><span>{themeName}</span></p>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ThemeDropdown
