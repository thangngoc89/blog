import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import Link from "react-router/lib/Link"
import TagDisplay from "../../components/TagDisplay"
import BaseLayout from "../BaseLayout"

export default class Archive extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
  };

  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const { params: { tag } } = this.props

    const postsByTags = enhanceCollection(this.context.collection, {
      filter: (post) => (
        post.layout === "Post" &&
        post.hasOwnProperty("tags") &&
        post.tags.indexOf(tag) > -1
      ),
      sort: "date",
      reverse: true,
    })

    return (
      <BaseLayout
        {...this.props}
        head={ {
          title: "Tag #" + tag,
        } }
      >
        <div className="posts">
          <div className="title">
            <h1>
              { "Tag " }
              <TagDisplay tag={ tag } />
            </h1>
          </div>
          {
            postsByTags.map((post) => (
              <div
                key={ post.__url }
                className="post-teaser"
              >
                <header>
                  <h2>
                    <Link
                      to={ post.__url }
                      className="post-link"
                    >
                      { post.title }
                    </Link>
                  </h2>
                  <p className="meta">
                    {
                      post.tags.map((tag) => (
                        <TagDisplay key={ tag } tag={ tag } />
                      ))
                    }
                    <span>{ new Date(post.date).toDateString() }</span>
                  </p>
                </header>
              </div>
            ))
          }
        </div>
      </BaseLayout>
    )
  }
}
