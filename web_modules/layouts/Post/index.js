import React, { Component, PropTypes } from 'react'
import Post from './Post'
import _ from 'lodash'

export default class PostConnect extends Component {
  static propTypes = {
    __filename: PropTypes.string.isRequired
  };

  static contextTypes = {
    collection: PropTypes.array.isRequired
  };

  get sibling () {
    let collection = this.context.collection
    collection = collection.filter((item) => item.layout === 'Post')
    collection = _.uniqBy(collection, '__url')
    collection = _.orderBy(collection, ['date'], ['asc'])
    if (process.env.NODE_ENV === 'production') {
      collection = collection.filter((t) => t.draft === undefined)
    }
    const currentPost = collection
      .find((item) => item.__filename === this.props.__filename)

    const i = collection.indexOf(currentPost)
    const last = collection.length - 1

    return {
      ...(i !== 0) && { previous: collection[i - 1] },
      ...(i !== last) && { next: collection[i + 1] }
    }
  }

  render () {
    return (
      <Post
        sibling={this.sibling}
        {...this.props}
      />
    )
  }
}
