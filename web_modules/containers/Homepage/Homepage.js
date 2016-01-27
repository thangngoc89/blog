import React, { Component, PropTypes } from 'react'
import Page from 'containers/Page'
import { connect } from 'react-redux'
import _ from 'lodash'
import PostItem from './PostItem'
import { Link } from 'react-router'
import styles from './HomePage.scss'

export class Homepage extends Component {
  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    collection: PropTypes.array
  };

  get collection () {
    let value = this.props.collection

    value = value.filter(t => t.layout === 'Post')
    // Exclude draft in production build
    if (__PROD__) {
      value = value.filter(t => t.draft === undefined)
    }
    value = _.orderBy(value, ['date'], ['desc'])
    value = _.uniqBy(value, '__url')

    return value
      .slice(0, 10)
      .map(PostItem)
  }

  render () {
    const {
      collection
    } = this.props

    return (
      <Page {...this.props}>
        {
          Boolean(!collection || !collection.length) &&
          <p>No entry</p>
        }
        {
          Boolean(collection && collection.length) &&
          <div>
            {this.collection}
          </div>
        }
        <Link
          className={styles.all}
          to='/archive'
        >
          Bài viết cũ hơn
        </Link>
      </Page>
    )
  }
}

export default connect(
  ({ collection }) => ({ collection })
)(Homepage)
