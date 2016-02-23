/* eslint-disable no-new */
import React, { Component, PropTypes } from 'react'
import Disqus from 'react-disqus-thread'
import Placeholder from '../Placeholder'
import '../../utils/load-waypoints'

export default class Comment extends Component {
  static propTypes = {
    identifier: PropTypes.string
  };

  constructor (props) {
    super(props)

    this.state = {
      opened: false
    }
  }

  componentDidMount () {
    this.attachWaypoint()
  }

  componentDidUpdate () {
    this.attachWaypoint()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (
      this.props.identifier === nextProps.identifier &&
      this.state.opened === nextState.opened
    ) {
      return false
    }
    return true
  }

  attachWaypoint () {
    new window.Waypoint({
      element: this._div,
      offset: 'bottom-in-view',
      handler: () => {
        if (!this.state.opened) {
          this.setState({ opened: true })
        }
      }
    })
  }

  render () {
    return (
      <div
        ref={(ref) => { this._div = ref }}
      >
        {
          this.state.opened &&
          process.env.NODE_ENV === 'production' &&
            <Disqus {...this.props} />
        }
        {
          this.state.opened &&
          process.env.NODE_ENV !== 'production' &&
            <Placeholder>
              Disqus loaded (development mode)
            </Placeholder>
        }
        {
          !this.state.opened &&
            <Placeholder>Loading Disqus...</Placeholder>
        }
      </div>
    )
  }
}
