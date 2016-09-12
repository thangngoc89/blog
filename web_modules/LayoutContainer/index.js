import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"

import Header from "../components/Header"
import Footer from "../components/Footer"
import GATracker from "../components/GATracker"

export class LayoutContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    location: PropTypes.object.isRequired,
    params: PropTypes.object,
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata

    return (
      <GATracker params={ this.props.params }>
        <Helmet
          meta={ [
            { property: "og:site_name", content: pkg.config.siteName },
            { name: "twitter:site", content: `@${pkg.config.twitter}` },
            { name: "theme-color", content: "#0275d8" },
            { name: "msapplication-TileColor", content: "#0275d8" },
          ] }
          link={ [
            { rel: "icon", href: "/images/favicon.ico" },
          ] }
        />
        <Header />
        { this.props.children }
        <Footer />
      </GATracker>
    )
  }
}

export default LayoutContainer
