import PropTypes from 'prop-types'
import clsx from 'clsx'

const Main = ({ children }) => {
  const mainStyles = clsx('bg-slate-950')
  return (
    <main style={{ height: '87vh' }} className={mainStyles}>
      {children}
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
