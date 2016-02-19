import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import invariant from 'invariant'

/**
 * Base template for others to extends.
 * Will render body if no children passed
 */
export default class Page extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string.isRequired,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired
  };

  render () {
    const {
      pkg
    } = this.context.metadata

    const {
      __filename,
      __url,
      head
    } = this.props

    invariant(
      typeof head.title === 'string',
      `Your page '${__filename}' needs a title`
    )

    const url = (__url === '//') ? '' : __url.slice(1)

    const meta = [
      {property: 'og:title', content: head.title},
      {property: 'og:type', content: 'article'},
      {property: 'og:url', content: pkg.homepage + url},
      // { property: "og:description", content: pageDescription(body) },
      {name: 'twitter:card', content: 'summary'},
      {name: 'twitter:title', content: head.title},
      {name: 'twitter:creator', content: `@${pkg.config.twitter}`}
      // { name: "twitter:description", content: pageDescription(body) },
    ]

    return (
      <div className='container-fluid'>
        <Helmet
          title={head.title}
          meta={meta}
        />
        <div className='row'>
          <div className='col-xs-12 col-sm-10 col-md-8 center-block'>
            {
              !this.props.children && this.props.body &&
                <div
                  dangerouslySetInnerHTML={{__html: this.props.body}}
                ></div>
            }
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
