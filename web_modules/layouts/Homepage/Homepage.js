import React, { Component, PropTypes } from 'react'
import Page from '../Page'
import { connect } from 'react-redux'
import _ from 'lodash'
import PostItem from './PostItem'
import { Link } from 'react-router'
import styles from './HomePage.scss'

export class Homepage extends Component {
  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired
  };

  static contextTypes = {
    collection: PropTypes.array.isRequired
  };

  get collection () {
    let value = this.context.collection
    value = value.filter(t => t.layout === 'Post')
    value = _.uniqBy(value, '__url')
    value = _.orderBy(value, ['date'], ['desc'])
    // Exclude draft in production build
    if (process.env.NODE_ENV === 'production') {
      value = value.filter(t => t.draft === undefined)
    }

    return value
      .slice(0, 10)
      .map(PostItem)
  }

  render () {
    const {
      collection
    } = this.context

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
