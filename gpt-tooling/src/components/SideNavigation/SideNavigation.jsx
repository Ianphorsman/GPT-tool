import { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Tabs from '../Tabs/Tabs'
import { Button } from 'react-daisyui'

const TABS = [
  { title: 'settings' },
  { title: 'conversations' },
  { title: 'chat' }
]

const SideNavigation = ({
  children,
  styles = ''
}) => {
  const sideNavigationStyles = clsx('border-r', 'border-slate-800', styles)
  const onClick = async () => {
    const result = await fetch('/api/pinecone/upsert', {
      method: 'POST',
      body: JSON.stringify({
        text: 'this is some dummy text for the test'
      })
    })
    const embedding = await result.json()
    console.log('embed cli', embedding)
  }
  
  return (
    <section className={sideNavigationStyles} style={{ width: '280px' }}>
      <div className="border-gradient rounded-lg">
        <Button
          variant="primary"
          className="px-4 py-2 bg-slate-900 rounded-lg"
          onClick={onClick}
        >
          Embedding
        </Button>
      </div>
      <Tabs>
        {TABS.map(({ title }) => (
          <Tabs.TabItem key={title} title={title}>
            <div>
            Content for Tab {title}
            </div>
          </Tabs.TabItem>
        ))}
      </Tabs>
    </section>
  )
}

SideNavigation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  styles: PropTypes.string
}

export default SideNavigation
