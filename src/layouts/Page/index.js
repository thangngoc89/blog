import React, { Component, PropTypes } from "react"
import cx from "classnames"
import BaseLayout from "../BaseLayout"

class Page extends Component {
  render() {
    const { head, body, ...others } = this.props

    return (
      <BaseLayout
        head={ head }
        {...others}
      >
        <article
          className={ cx({
            "feature-image": head["feature-img"],
          }) }
        >
          <header
            style={ {
              backgroundImage: `url('${head["feature-img"]}')`,
            } }
          >
            <h1 className="title">{ head.title }</h1>
          </header>
          <section
            className="post-content"
            dangerouslySetInnerHTML={ { __html: body } }
          />
        </article>

        {/*
        <!-- Post navigation -->
        {% if site.theme_settings.post_navigation %}
        <div id="post-nav">
            {% if page.previous.url %}
            <a id="prev-post" href="{{ site.baseurl }}{{ page.previous.url }}">
              <span className="page-title">{{ page.previous.title }}</span>
              <span className="nav-label">
                <i className="fa fa-chevron-left"></i> {{ site.theme_settings.str_prev }}
              </span>
            </a>
            {% endif %}
            {% if page.next.url %}
            <a id="next-post" href="{{ site.baseurl }}{{ page.next.url }}">
               <span className="page-title">{{ page.next.title }}</span>
               <span className="nav-label">
                {{ site.theme_settings.str_next }} <i className="fa fa-chevron-right"></i>
               </span>
             </a>
            {% endif %}
        </div>
        {% endif %}
        */}
      </BaseLayout>
    )
  }
}

Page.propTypes = {
  head: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
}

export default Page
