import React, { Component, PropTypes } from 'react'
import Page from '../Page'
import Date from '../../Date'
import ReadTime from '../../ReadTime'
import GitHubEditLink from '../../GitHubEditLink'
import styles from './Post.scss'

/**
 * Template for blog post
 */
export default class Post extends Component {
  static propTypes = {
    __filename: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    rawBody: PropTypes.string.isRequired
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired
  };

  render () {
    const {
      head,
      body,
      rawBody
    } = this.props

    const {pkg: { config }} = this.context.metadata

    return (
      <Page {...this.props}>
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
          className={styles.content}
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
      </Page>
    )
  }
}
