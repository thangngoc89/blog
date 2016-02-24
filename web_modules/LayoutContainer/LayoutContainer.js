import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'

import Header from '../components/Header'
import Footer from '../components/Footer'
import GATracker from '../components/GATracker'
import ProgressBar from 'react-progress-bar-plus'

const PureProgressBar = onlyUpdateForKeys(['percent'], ProgressBar)

export class LayoutContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    location: PropTypes.object.isRequired,
    params: PropTypes.object,
    isLoading: PropTypes.bool
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired
  };

  render () {
    const {
      pkg
    } = this.context.metadata

    const percent = (this.props.isLoading) ? 70 : 100

    return (
      <GATracker params={this.props.params}>
        <Helmet
          meta={[
            {property: 'og:site_name', content: pkg.config.siteName},
            {name: 'twitter:site', content: `@${pkg.config.twitter}`}
          ]}
        />
        <PureProgressBar
          percent={percent}
          intervalTime={100}
          autoIncrement
        />
        <Header />

        {this.props.children}
        <Footer />
      </GATracker>
    )
  }
}

export default LayoutContainer
