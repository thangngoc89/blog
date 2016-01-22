import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

import Header from 'components/Header'
import Footer from 'components/Footer'

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ])
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired
  };

  render () {
    const {
      pkg
    } = this.context.metadata

    return (
      <div>
        <Helmet
          meta={[
            {property: 'og:site_name', content: pkg.config.name},
            {name: 'twitter:site', content: `@${pkg.config.twitter}`}
          ]}
        />
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
