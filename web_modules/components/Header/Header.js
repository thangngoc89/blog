import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import NavToggle from './NavToggle'
import styles from './Header.scss'

export default class Header extends Component {
  static propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    sidebarToggle: PropTypes.func.isRequired
  };

  render () {
    return (
      <nav className={styles.nav}>
        <NavToggle
          isOpen={this.props.isSidebarOpen}
          handleOnClick={this.props.sidebarToggle}
        />
        <Link
          className={styles.link}
          to='/'
        >
          Khoa Nguyen
        </Link>
      </nav>
    )
  }
}
