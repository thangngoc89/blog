import React, { Component, PropTypes } from 'react'
import Page from 'containers/Page'
import Date from 'components/Date'
import GitHubEditLink from 'components/GitHubEditLink'
import styles from './Post.scss'

/**
 * Template for blog post
 */
export default class Post extends Component {
  static propTypes = {
    __filename: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired
  };

  render () {
    const {
      head,
      body
    } = this.props

    const {pkg: { config }} = this.context.metadata

    return (
      <Page {...this.props}>
        <h1>{head.title}</h1>
        <Date date={head.date} />
        {
          body &&
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{__html: body}}
          ></div>
        }
        <GitHubEditLink
          baseUrl={config['edit-on-github']}
          fileName={this.props.__filename}
        />
      </Page>
    )
  }
}
