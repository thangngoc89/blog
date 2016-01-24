import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './Sidebar.scss'
import classnames from 'classnames'

export default class NavLink extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    activePath: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render () {
    const { path, text, activePath } = this.props

    const className = classnames({
      [styles['nav-item']]: true,
      [styles['active']]: path === activePath
    })

    return (
      <Link
        to={path}
        className={className}
        onClick={this.props.onClick}
      >
        {text}
      </Link>
    )
  }
}
