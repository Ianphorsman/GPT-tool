import PropTypes from 'prop-types'
import clsx from 'clsx'
import PageContainer from './PageContainer'

const Main = ({ children }) => {
  const mainStyles = clsx('p-8')
  return (
    <main className={mainStyles}>
      <PageContainer>
        {children}
      </PageContainer>
    </main>
  )
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Main
