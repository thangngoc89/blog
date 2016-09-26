import React, { Component, PropTypes } from "react"
import IconRight from "react-icons/fa/chevron-right"
import IconLeft from "react-icons/fa/chevron-left"
import Link from "react-router/lib/Link"
import BaseLayout from "../BaseLayout"
import GitHubEditLink from "../../components/GithubEditLink/index.js"
import cx from "classnames"
import site from "../../config.yml"

class Post extends Component {
  componentDidMount() {
    this.moveImageToCenter()
  }

  componentDidUpdate() {
    this.moveImageToCenter()
  }

  moveImageToCenter = () => {
    Array.from(
      document.querySelectorAll(".post-content img")
    ).forEach((img) => {
      img.parentElement.style["text-align"] = "center"
    })
  }
  render() {
    const { head, body, navigation, ...others } = this.props

    const date = head.date ? new Date(head.date) : null

    return (
      <BaseLayout
        head={ head }
        {...others}
      >
        <article
          className="feature-image"
        >
          <header
            className={ cx({
              "header-light": head.light_theme,
            }) }
            style={ {
              ...!head["feature-img"] && { background: "#F98752" },
              backgroundImage: `url('${head["feature-img"]}')`,
            } }
          >
            <h1 className="title">{ head.title }</h1>
            <p className="meta">
              {
                date && date.toDateString()
              }
              {
                head.author && head.author
              }
            </p>
          </header>

          <section
            className="post-content"
            dangerouslySetInnerHTML={ { __html: body } }
          />

          <GitHubEditLink
            className="github-edit-link"
            baseUrl={ site.theme_settings.edit_on_github }
            fileName={ this.props.__filename }
          />

          <section
            className="subscribe-box"
          >
            <h2>{ "Nhận bài viết mới qua email mỗi tuần" }</h2>
            <p>{ "Web development, React.js, Redux.js, Webpack" }</p>
            <form
              action={ site.mailchimp }
              method="post"
              target="_blank"
              noValidate
            >
              <input type="email" name="EMAIL" required placeholder="Email của bạn" />
              <input type="submit" value="Theo dõi" />
            </form>
            <em>{ "Đừng lo, mình cực ghét spam" }</em>
          </section>
        </article>

        <div id="post-nav">
          {
            navigation.previous &&
            <Link
              id="prev-post"
              to={ navigation.previous.__url }
            >
              <span className="page-title">
                { navigation.previous.title }
              </span>
              <span className="nav-label">
                <IconLeft /> { site.theme_settings.str_prev }
              </span>
            </Link>
          }
          {
            navigation.next &&
            <Link
              id="next-post"
              to={ navigation.next.__url }
            >
              <span className="page-title">
                { navigation.next.title }
              </span>
              <span className="nav-label">
                { site.theme_settings.str_next } <IconRight />
              </span>
            </Link>
          }
        </div>
      </BaseLayout>
    )
  }
}

Post.propTypes = {
  head: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
  __filename: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }).isRequired,
}

export default Post
