import React, { Component } from 'react'

export default class SVGIcon extends Component {
  static propTypes = {
    icon: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    style: React.PropTypes.object
  };

  static defaultProps = {
    size: 24
  };

  renderGraphic () {
    switch (this.props.icon) {
      case 'bookmark-outline':
        return (
          <g><path d='M17 3h-10c-1.1 0-1.99.9-1.99 2l-.01 16 7-3 7 3v-16c0-1.1-.9-2-2-2zm0 15l-5-2.18-5 2.18v-13h10v13z'></path></g>
        )
      case 'person-outline':
        return (
          <g><path d='M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1-2.1-.94-2.1-2.1.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1h-12.2v-1.1c0-.64 3.13-2.1 6.1-2.1m0-10.9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z'></path></g>
        )
      case 'post-github':
        return (
          <g><path d='M7.2 6.6h-.1c-.5 1.4-.2 2.3-.1 2.6-.6.7-1 1.6-1 2.6 0 3.8 2.4 4.6 4.6 4.9-.2 0-.6.2-.8.8-.4.2-1.8.7-2.6-.7 0 0-.5-.8-1.3-.9 0 0-.8 0-.1.5 0 0 .6.3.9 1.3 0 0 .5 1.7 3 1.1v3.1h5v-3.5c0-1-.4-1.5-.8-1.8 2.2-.2 4.6-1 4.6-4.8 0-1.1-.4-2-1-2.6.1-.3.4-1.2-.1-2.6 0 0-.8-.3-2.7 1-.8-.2-1.6-.3-2.5-.3-.8 0-1.7.1-2.5.3-1.4-1-2.2-1-2.6-1zm12.8 15.4h-16c-1.1 0-2-.9-2-2v-16c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2z'></path></g>
        )
    }
  }

  render () {
    let styles = {
      fill: 'currentcolor',
      verticalAlign: 'middle',
      width: this.props.size, // CSS instead of the width attr to support non-pixel units
      height: this.props.size // Prevents scaling issue in IE
    }

    return (
      <svg
        viewBox='0 0 24 24'
        preserveAspectRatio='xMidYMid meet'
        fit
        style={{
          ...styles,
          ...this.props.style
        }}
      >
        {this.renderGraphic()}
      </svg>
    )
  }
}
