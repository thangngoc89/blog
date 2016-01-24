import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'
import avatarImg from './avatar.jpg'
import styles from './Sidebar.scss'
import { push as Menu } from 'react-burger-menu'

export default class Sidebar extends Component {
  static propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    activePath: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    sidebarToggle: PropTypes.func.isRequired
  };

  // Poor workaround
  // in static build, we recive root path
  // as `//`
  get activePath () {
    let a = this.props.activePath
    return (a === '//') ? '/' : a
  }

  render () {
    const {
      isSidebarOpen,
      sidebarToggle,
      metadata: {config: {slogan, ...social}}
    } = this.props

    return (
      <Menu
        onStateChange={({ isOpen }) => sidebarToggle(isOpen)}
        isOpen={isSidebarOpen}
        pageWrapId='page-wrap'
        outerContainerId='statinamic'
      >
        <div className={styles.avatar}>
          <Link
            to='/'
            title='Home'
            onClick={sidebarToggle}
          >
            <img src={avatarImg} />
          </Link>
        </div>
        <div className={styles.item}>
          <p>{slogan}</p>
        </div>

        <nav className={styles.nav} role='navigation'>
          <NavLink
            path='/'
            text='Trang chủ'
            activePath={this.activePath}
            onClick={sidebarToggle}
          />
          <NavLink
            path='/archive'
            text='Bài viết'
            activePath={this.activePath}
            onClick={sidebarToggle}
          />
          <NavLink
            path='/about'
            text='Giới thiệu'
            activePath={this.activePath}
            onClick={sidebarToggle}
          />
          <a className={styles['nav-item']} href={`//github.com/${social.github}`}>GitHub</a>
          <a className={styles['nav-item']} href={`mailto:${social.email}`}>Email</a>
        </nav>

        <div className={styles.item}>
          <p>
          © 2016. All rights reserved.
          </p>
        </div>
      </Menu>
    )
  }
}
