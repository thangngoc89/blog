import React, { Component, PropTypes } from "react"
import cx from "classnames"
import Helmet from "react-helmet"
import { WindowResizeListener } from "react-window-resize-listener"
import { Link } from "react-router"

import Date from "../../components/Date"
import ReadTime from "../../components/ReadTime"
import GitHubEditLink from "../../components/GitHubEditLink"
import Affix from "./Affix"
import Disqus from "../../components/Comment"
import Icon from "../../components/Icon"
import styles from "./Post.scss"

/**
 * Template for blog posts
 */
export default class Post extends Component {
  static propTypes = {
    __filename: PropTypes.string.isRequired,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    rawBody: PropTypes.string.isRequired,
    sibling: PropTypes.object.isRequired,
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    const { toc = true } = props.head

    this.state = {
      isMounted: false,
      affixWidth: 0,
      toc,
    }
    this.calculateAffixWidth = this.calculateAffixWidth.bind(this)
  }

  componentDidMount() {
    this.mounted()
    this.calculateAffixWidth()
  }

  componentDidUpdate() {
    this.calculateAffixWidth()
  }

  calculateAffixWidth() {
    const containerWidth = this._container.getBoundingClientRect().width
    const contentWidth = this._content.getBoundingClientRect().width
    const affixWidth = containerWidth - contentWidth - 50

    if (affixWidth !== this.state.affixWidth) {
      this.setState({
        affixWidth,
      })
    }
  }

  mounted() {
    this.setState({
      isMounted: true,
    })
  }

  get isTocVisible() {
    return this.state.toc &&
      this.state.isMounted &&
      this.state.affixWidth > 200
  }

  render() {
    const {
      pkg,
    } = this.context.metadata

    const {
      head,
      body,
      rawBody,
      __url,
      sibling,
    } = this.props

    const { pkg: { config } } = this.context.metadata

    const title = head.title + " - " + pkg.config.siteName
    const meta = [
      { property: "og:title", content: title },
      { property: "og:type", content: "article" },
      { property: "og:url", content: pkg.homepage + __url.slice(1) },
      { property: "og:description", content: head.description },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:creator", content: `@${pkg.config.twitter}` },
      { name: "twitter:description", content: head.description },
      { name: "description", content: head.description },
    ]

    const divClass = cx(styles.contentColumn, {
      [styles.withBorder]: this.isTocVisible,
      "center-block": !this.isTocVisible,
    })

    return (
      <div
        className="container"
        ref={ (ref) => this._container = ref }
      >
        <WindowResizeListener
          onResize={ () => this.calculateAffixWidth() }
        />
        <Helmet
          title={ head.title }
          meta={ meta }
        />
        <div className="row">
          <div
            className={ divClass }
            ref={ (ref) => this._content = ref }
          >
            <h1 className={ styles.title }>{ head.title }</h1>
            <Date
              date={ head.date }
              className={ styles.date }
            />
            <ReadTime
              text={ rawBody }
              className={ styles.readTime }
            />

            <article
              className={ styles.article }
              dangerouslySetInnerHTML={ { __html: body } }
            ></article>

            {
              head.translate &&
                <a
                  href={ head.translate.url }
                  target="_blank"
                  className={ styles.translate }
                >
                  Translated from original post by { head.translate.author }
                </a>
            }
            {
              sibling.previous &&
                <div
                  className={ styles.siblingLeft }
                >
                  <Link to={ sibling.previous.__url }>
                    <Icon icon="left-open-big" />
                    { sibling.previous.title }
                  </Link>
                </div>
            }
            {
              sibling.next &&
                <div className={ styles.siblingRight }>
                  <Link to={ sibling.next.__url }>
                    { sibling.next.title }
                    <Icon icon="right-open-big" />
                  </Link>
                </div>
            }
            <GitHubEditLink
              baseUrl={ config["edit-on-github"] }
              fileName={ this.props.__filename }
            />
            <Disqus
              shortname={ pkg.config.disqus }
              identifier={ head.date }
              title={ head.title }
              url={ pkg.homepage + __url.slice(1) }
            />
          </div>
          {
            this.isTocVisible &&
              <Affix
                width={ this.state.affixWidth }
                container={ this._container }
              />
          }
        </div>
      </div>
    )
  }
}
