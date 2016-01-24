import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Sidebar from 'components/Sidebar'

import { connect } from 'react-redux'
import { actions as navActions } from 'redux/modules/nav'

import styles from './Layout.scss'
/**
 * Base layout handle Header, Sidebar and Footer
 */
export class Layout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    location: PropTypes.object.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    sidebarToggle: PropTypes.func.isRequired
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired
  };

  render () {
    const {
      pkg
    } = this.context.metadata

    const wrapClass = classnames({
      [styles.wrap]: true,
      [styles.open]: this.props.isSidebarOpen
    })

    return (
      <div>
        <Helmet
          meta={[
            {property: 'og:site_name', content: pkg.config.name},
            {name: 'twitter:site', content: `@${pkg.config.twitter}`}
          ]}
        />
        <Sidebar
          activePath={this.props.location.pathname}
          isSidebarOpen={this.props.isSidebarOpen}
          sidebarToggle={this.props.sidebarToggle}
          metadata={pkg}
        />
        <div className={wrapClass}>
          <Header
            isSidebarOpen={this.props.isSidebarOpen}
            sidebarToggle={this.props.sidebarToggle}
          />
          <div className={styles.content}>
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.nav
})

export default connect(mapStateToProps, navActions)(Layout)
