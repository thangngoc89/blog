import React, { Component, PropTypes } from "react"
import Post from "./Post"
import enhanceCollection from "phenomic/lib/enhance-collection"

export default class PostAddNavigation extends Component {
  static propTypes = {
    __filename: PropTypes.string.isRequired,
  };

  static contextTypes = {
    collection: PropTypes.array.isRequired,
  };

  get postNavigation() {
    const collection = enhanceCollection(this.context.collection, {
      filter: (post) => {
        if (process.env.NODE_ENV !== "production") {
          return (post.layout === "Post")
        }
        else {
          return (post.layout === "Post" && post.draft === undefined)
        }
      },
      sort: "date",
      addSiblingReferences: true,
    })
    const currentPost = collection
      .find((item) => item.__filename === this.props.__filename)

    return {
      next: currentPost.next,
      previous: currentPost.previous,
    }
  }

  render() {
    return (
      <Post
        navigation={ this.postNavigation }
        { ...this.props }
      />
    )
  }
}
