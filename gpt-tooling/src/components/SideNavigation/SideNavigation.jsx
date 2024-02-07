import React, { useState } from 'react'
import { Button, Drawer, Menu } from 'react-daisyui'

const SideNavigation = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(prev => !prev)
  return (
    <Drawer
      open={open}
      onClickOverlay={toggleOpen}
      className="md:w-80 md:p-4 text-center sm:hidden md:block"
      side={(
        <Menu className="p-4 w-80 h-full bg-base-200 text-base-content">
          <Menu.Item>
            <a>Sidebar Item 1</a>
          </Menu.Item>
          <Menu.Item>
            <a>Sidebar Item 2</a>
          </Menu.Item>
        </Menu>
      )}
    >
     <Button color="primary" onClick={toggleOpen} className="lg:hidden">
        Open drawer
      </Button>
    </Drawer>
  )
}

export default SideNavigation
