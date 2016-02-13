import React, { PropTypes } from 'react'
import classnames from 'classnames'
import styles from './SidebarToggle.scss'

const SidebarToggle = ({isOpen, handleOnClick}) => {
  const className = classnames({
    [styles['nav-toggle']]: true,
    [styles['active']]: isOpen
  })

  return (
    <a
      className={className}
      onClick={handleOnClick}
    >
      <span></span>
    </a>
  )
}

SidebarToggle.propTypes = {
  handleOnClick: PropTypes.func,
  isOpen: PropTypes.bool.isRequired
}

export default SidebarToggle
