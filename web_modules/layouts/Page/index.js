import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import invariant from 'invariant'
import cx from 'classnames'

/**
 * Base template for others to extends.
 * Will render body if no children passed
 */
export default class Page extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string/* .isRequired */,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string/* .isRequired */,
    className: PropTypes.string
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
      head,
      className
    } = this.props

    invariant(
      typeof head.title === 'string',
      `Your page '${__filename}' needs a title`
    )
    const title = head.title + ' - ' + pkg.config.siteName
    const meta = [
      {property: 'og:title', content: title},
      {property: 'og:type', content: 'article'},
      {property: 'og:url', content: pkg.homepage + __url},
      // { property: "og:description", content: pageDescription(body) },
      {name: 'twitter:card', content: 'summary'},
      {name: 'twitter:title', content: title},
      {name: 'twitter:creator', content: `@${pkg.config.twitter}`}
      // { name: "twitter:description", content: pageDescription(body) },
    ]
    const divClass = cx({
      'center-block': true,
      'col-xs-12 col-sm-11 col-md-8': !className,
      [className]: className
    })
    return (
      <div className='container-fluid'>
        <Helmet
          title={title}
          meta={meta}
        />
        <div className='row'>
          <div className={divClass}>
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
