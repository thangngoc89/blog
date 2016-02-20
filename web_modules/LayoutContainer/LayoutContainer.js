import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'
import GATracker from '../components/GATracker'

import styles from './LayoutContainer.scss'
/**
 * Base layout handle Header, Sidebar and Footer
 * TODO: Refactor me
 */
export class LayoutContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    location: PropTypes.object.isRequired,
    params: PropTypes.object
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired
  };

  render () {
    const {
      pkg
    } = this.context.metadata

    return (
      <GATracker params={this.props.params}>
        <Helmet
          meta={[
            {property: 'og:site_name', content: pkg.config.siteName},
            {name: 'twitter:site', content: `@${pkg.config.twitter}`}
          ]}
        />
        <Header />
        <div className={styles.content}>
          {this.props.children}
        </div>
        <Footer />
      </GATracker>
    )
  }
}

export default LayoutContainer
