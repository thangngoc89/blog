import React, { Component, PropTypes } from 'react'

export default class TagRoute extends Component {
  static propTypes = {
    routeParams: PropTypes.object.isRequired
  }
  render () {
    return (
      <div>{this.props.routeParams.tag}</div>
    )
  }
}
