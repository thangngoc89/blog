import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router'
import avatarImg from './avatar.jpg'
import styles from './Sidebar.scss'

export default class SidebarWrapper extends Component {
  static propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    metadata: PropTypes.object.isRequired
  };

  render () {
    const {
      isSidebarOpen,
      metadata: {config: {slogan, email, github}}
    } = this.props

    const sidebarClass = classnames({
      [styles.sidebar]: true,
      [styles.sidebarOpen]: isSidebarOpen
    })
    return (
      <div className={sidebarClass}>
        <div className={styles.avatar}>
          <Link to='/' title='Home'>
            <img src={avatarImg} height='125px' width='125px' />
          </Link>
        </div>
        <div className={styles.item}>
          <p>{slogan}</p>
        </div>
        <nav className={styles.nav} role='navigation'>
          <Link to='/' className={styles['nav-item'] + ' ' + styles['active']}>Home</Link>
          <Link to='/archive' className={styles['nav-item']}>Archive</Link>
          <a className={styles['nav-item']} href={`//github.com/${github}`}>GitHub</a>
          <a className={styles['nav-item']} href={`mailto:${email}`}>Email</a>
        </nav>
        <div className={styles.item}>
          <p>
          © 2016. All rights reserved.
          </p>
        </div>
      </div>
    )
  }
}
