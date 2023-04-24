import PropTypes from 'prop-types'
import clsx from 'clsx'

const SideNavigation = ({
  children,
  styles = ''
}) => {
  const sideNavigationStyles = clsx('border-r', 'border-slate-800', styles)
  return (
    <section className={sideNavigationStyles} style={{ width: '280px' }}>
      {children}
    </section>
  )
}

SideNavigation.propTypes = {
  children: PropTypes.oneOfType(
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ),
  styles: PropTypes.string
}

export default SideNavigation
