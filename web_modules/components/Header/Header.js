import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import NavToggle from 'components/SidebarToggle'
import styles from './Header.scss'

const Header = ({isSidebarOpen, sidebarToggle}) => {
  return (
    <header className={styles.nav}>
      <NavToggle
        isOpen={isSidebarOpen}
        handleOnClick={sidebarToggle}
      />
      <Link
        className={styles.link}
        to='/'
      >
        Khoa Nguyen
      </Link>
    </header>
  )
}

Header.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  sidebarToggle: PropTypes.func.isRequired
}

export default Header
