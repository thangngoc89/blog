import React, { Component, PropTypes } from 'react'
import Page from 'containers/Page'
import { connect } from 'react-redux'
import _ from 'lodash'
import PostItem from './PostItem'
import { Link } from 'react-router'

export class Homepage extends Component {
  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    collection: PropTypes.array
  };

  get collection () {
    return _.chain(this.props.collection)
      .filter(t => (t.layout === 'Post') && (t.draft === undefined))
      .sortByOrder(['date'], ['desc'])
      .uniq('__url')
      .slice(0, 5)
      .map(PostItem)
      .value()
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
        <Link to='/archive'>
          Xem tất cả bài viết
        </Link>
      </Page>
    )
  }
}

export default connect(
  ({ collection }) => ({ collection })
)(Homepage)
