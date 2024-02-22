import React, { useState } from 'react'
import { Dropdown } from 'react-daisyui'

const themes = ['night', 'dracula', 'retro', 'forest', 'sunset', 'halloween']

const ThemeDropdown = ({ theme, setTheme, setHoverTheme, setIsHoverTheme }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onMouseEnter = (themeName) => {
    setHoverTheme(themeName)
    setIsHoverTheme(true)
  }
  const onClick = (themeName) => {
    window.localStorage.setItem('daisyui-theme', themeName)
    setTheme(themeName)
    setIsHoverTheme(false)
    setIsOpen(false)
  }
  return (
    <Dropdown hover open={isOpen} end>
      <Dropdown.Toggle className="btn btn-ghost" button={false}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-secondary">
          <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {themes.map((themeName) => (
          <Dropdown.Item
            key={themeName}
            onMouseEnter={() => onMouseEnter(themeName)}
            onMouseLeave={() => setIsHoverTheme(false)}
            onClick={() => onClick(themeName)}
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
