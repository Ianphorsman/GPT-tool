import PropTypes from 'prop-types'
import clsx from 'clsx'
import PageContainer from './PageContainer'

const Header = ({ children }) => {
  const headerStyles = clsx('p-8', 'bg-slate-950', 'w-full', 'text-slate-300', 'border-b', 'border-slate-800')
  return (
    <header style={{ height: '13vh' }} className={headerStyles}>
      <PageContainer>
        {children}
      </PageContainer>
    </header>
  )
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Header
