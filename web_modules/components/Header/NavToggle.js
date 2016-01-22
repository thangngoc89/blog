import React, { PropTypes, Component } from 'react'
import styles from './NavToggle.scss'
import classnames from 'classnames'

export default class NavToggle extends Component {
  static propTypes = {
    handleOnClick: PropTypes.func,
    isOpen: PropTypes.bool.isRequired
  };

  render () {
    const aTagClasses = classnames({
      [styles['nav-toggle']]: true,
      [styles['active']]: this.props.isOpen
    })

    return (
      <a
        className={aTagClasses}
        onClick={this.props.handleOnClick}
      >
        <span></span>
      </a>
    )
  }
}
