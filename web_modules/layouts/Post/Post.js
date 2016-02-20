import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import cx from 'classnames'

import getScreenSize from '../../utils/get-screen-size'

import Date from '../../components/Date'
import ReadTime from '../../components/ReadTime'
import GitHubEditLink from '../../components/GitHubEditLink'
import Affix from './Affix'

import styles from './Post.scss'

/**
 * Template for blog posts
 */
export default class Post extends Component {
  static propTypes = {
    __filename: PropTypes.string.isRequired,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    rawBody: PropTypes.string.isRequired
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired
  };

  render () {
    const {
      pkg
    } = this.context.metadata

    const {
      head,
      body,
      rawBody,
      __url
    } = this.props

    const {pkg: { config }} = this.context.metadata

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

    let { toc = true } = head

    // Disable toc on sm and xs screen
    let screenSize = getScreenSize()

    if (screenSize === 'small') {
      toc = false
    }
    const divClass = cx(styles.contentColumn, {
      [styles.withBorder]: toc,
      'center-block': !toc
    })

    return (
      <div className='container'>
        <Helmet
          title={head.title}
          meta={meta}
        />
        <div className='row'>
          <div className={divClass}>
            <h1 className={styles.title}>{head.title}</h1>
            <Date
              date={head.date}
              className={styles.date}
            />
            <ReadTime
              text={rawBody}
              className={styles.readTime}
            />

            <article
              className={styles.article}
              dangerouslySetInnerHTML={{__html: body}}
            ></article>

            {
              head.translate &&
                <a href={head.translate.url}>
                  Translated from original post by {head.translate.author}
                </a>
            }
            <GitHubEditLink
              baseUrl={config['edit-on-github']}
              fileName={this.props.__filename}
            />
          </div>
          {
            toc &&
              <Affix container={this} />
          }
        </div>
      </div>
    )
  }
}
