import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import Link from "react-router/lib/Link"

import BaseLayout from "../BaseLayout"
import site from "../../config.yml"
import TagDisplay from "../../components/TagDisplay"

const numberOfLatestPosts = 6

export default class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: "Post" },
      sort: "date",
      reverse: true,
    })
    .slice(0, numberOfLatestPosts)

    return (
      <BaseLayout
        className="home" { ...this.props }
      >
        {
          site.theme_settings.header_text &&
            <div
              className="call-out"
              style={ {
                backgroundImage: `url('/${ site.theme_settings.header_text_feature_image }')`,
              } }
              dangerouslySetInnerHTML={ { __html: site.theme_settings.header_text } }
            />
        }

        <div className="posts">
          {
            latestPosts.map((post) => (
              <div
                key={ post.__url }
                className="post-teaser"
              >
                <header>
                  <h1>
                    <Link
                      to={ post.__url }
                      className="post-link"
                    >
                      { post.title }
                    </Link>
                  </h1>
                  <p className="meta">
                    {
                      post.tags.map((tag) => (
                        <TagDisplay key={ tag } tag={ tag } />
                      ))
                    }
                    <span>{ new Date(post.date).toDateString() }</span>
                  </p>
                </header>
                <div className="excerpt">
                  <p>{ post.description }</p>
                  <Link
                    to={ post.__url }
                    className="button"
                  >
                    { site.theme_settings.str_continue_reading }
                  </Link>
                </div>
              </div>
            ))
          }
        </div>

        {/*
        {% if paginator.total_pages > 1 %}
        <div className="pagination">
          {% if paginator.previous_page %}
          <a href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}" className="button" >
            <i className="fa fa-chevron-left"></i>
            {{ site.theme_settings.str_prev }}
          </a>
          {% endif %}
          {% if paginator.next_page %}
          <a href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}" className="button" >
            {{ site.theme_settings.str_next }}
            <i className="fa fa-chevron-right"></i>
          </a>
          {% endif %}
        </div>
        {% endif %}
        */}
      </BaseLayout>
    )
  }
}
