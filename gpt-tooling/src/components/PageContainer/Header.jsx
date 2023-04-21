import PropTypes from 'prop-types'
import clsx from 'clsx'
import PageContainer from './PageContainer'

const Header = ({ children }) => {
  const headerStyles = clsx('p-8', 'bg-slate-200')
  return (
    <header className={headerStyles}>
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
