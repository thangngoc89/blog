import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { actions as navActions } from 'redux/modules/nav'

import NavToggle from './NavToggle'
import styles from './Header.scss'

export class Header extends Component {
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
        { '  ' }
        <Link to='/nice'>Nice</Link>
        { '  ' }
        <Link to='/cach-xem-quang-cao-tren-paidverts'>Post</Link>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.nav
})

export default connect(mapStateToProps, navActions)(Header)
