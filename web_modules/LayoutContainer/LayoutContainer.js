import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

import Header from '../Header'
import Sidebar from '../Sidebar'
import GATracker from '../GATracker'

import { connect } from 'react-redux'
import { actions as navActions } from '../redux/modules/nav'

import styles from './LayoutContainer.scss'
/**
 * Base layout handle Header, Sidebar and Footer
 * TODO: Refactor me
 */
export class LayoutContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    location: PropTypes.object.isRequired,
    params: PropTypes.object,
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

    return (
      <GATracker params={this.props.params}>
        <Helmet
          meta={[
            {property: 'og:site_name', content: pkg.config.siteName},
            {name: 'twitter:site', content: `@${pkg.config.twitter}`}
          ]}
        />
        <Sidebar
          activePath={this.props.location.pathname}
          isSidebarOpen={this.props.isSidebarOpen}
          sidebarToggle={this.props.sidebarToggle}
          metadata={pkg}
        />
        <div id='page-wrap'>
          <Header
            isSidebarOpen={this.props.isSidebarOpen}
            sidebarToggle={this.props.sidebarToggle}
          />
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      </GATracker>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.nav
})

export default connect(mapStateToProps, navActions)(LayoutContainer)
