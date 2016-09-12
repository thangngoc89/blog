import React, { Component, PropTypes } from "react"
import ga from "react-ga"

const isBrowser = (typeof window !== "undefined")
const isProduction = process.env.NODE_ENV === "production"

export default class GATracker extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    params: PropTypes.object.isRequired,
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const {
      pkg: {
        config: { googleAnalyticsUA },
      },
    } = this.context.metadata

    if (isProduction && isBrowser) {
      ga.initialize(googleAnalyticsUA)
    }
    if (!isProduction && isBrowser) {
      console.info("ga.initialize", googleAnalyticsUA)
    }
    this.logPageview()
  }

  componentWillReceiveProps(props) {
    if (props.params.splat !== this.props.params.splat) {
      this.logPageview()
    }
  }

  logPageview() {
    if (isProduction && isBrowser) {
      ga.pageview(window.location.href)
    }
    if (!isProduction && isBrowser) {
      console.info("New pageview", window.location.href)
    }
  }

  render() {
    return React.createElement(
      "div",
      {},
      this.props.children,
    )
  }
}
