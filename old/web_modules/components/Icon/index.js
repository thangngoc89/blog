import React, { Component, PropTypes } from "react"

export default class Icon extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
  };

  render() {
    return (
      <i className={ `icon-${this.props.icon}` } />
    )
  }
}
