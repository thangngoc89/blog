import React, { Component, PropTypes } from 'react'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import styles from './Affix.scss'
import cx from 'classnames'
import smoothScroll from 'smoothscroll' // Auto bound to global click event

if (typeof window !== 'undefined') {
  // DANGER >_< Global variable
  require('waypoints/lib/noframework.waypoints.js')
}

/**
 * Get list of markdownIt-Anchor node
 * @return {array}
 */
const getAnchors = () => {
  if (typeof window !== 'undefined') {
    const anchors = document.getElementsByClassName('markdownIt-Anchor')
    return Object.keys(anchors)
      .map((key) => anchors[key])
  }
}

/**
 * Get processed list of anchor nodes
 * @return {array}
 */
const listAnchors = () => {
  if (typeof window !== 'undefined') {
    return getAnchors()
      .map((node) => ({
        level: node.parentNode.nodeName.toLowerCase(), // H1 -> h1
        href: node.getAttribute('href'),
        text: node.parentNode.innerHTML
          .replace(/(<([^>]+)>)/ig, '')
          .replace('#', '')
          .trim()
      }))
  }

  return []
}

export default class Affix extends Component {
  static propTypes = {
    container: PropTypes.any
  };

  constructor (props) {
    super(props)
    this.doIHaveDOMYet = false // isomorphic trick
    this.state = {
      activeAnchor: ''
    }
    this.handleAnchorClick = this.handleAnchorClick.bind(this)
  }

  componentDidMount () {
    this.attachWayPoints()
    this.doIHaveDOMYet = true
    this.forceUpdate()
  }

  componentWillReceiveProps () {
    window.Waypoint.destroyAll()
    this.attachWayPoints()
  }

  componentWillUnmount () {
    window.Waypoint.destroyAll()
  }

  attachWayPoints () {
    const me = this
    getAnchors()
      .forEach((element) =>
        new window.Waypoint({
          element,
          offset: '20%',
          handler: function (direction) {
            if (direction === 'down' || !this.previous()) {
              me.setState({
                activeAnchor: this.element.getAttribute('href')
              })
            } else if (direction === 'up') {
              me.setState({
                activeAnchor: this.previous().element.getAttribute('href')
              })
            }
          }
        })
      )
  }

  /**
   * Set anchor active state when click on anchor link
   * @param  {string} href
   */
  handleAnchorClick (e) {
    e.preventDefault()
    const href = e.target.getAttribute('href')
    smoothScroll(document.getElementById(href.slice(1)))
    this.setState({
      activeAnchor: href
    })
  }

  getList () {
    if (
      typeof window === 'undefined' ||
      !this.doIHaveDOMYet
    ) {
      return null
    }

    return listAnchors().map((anchor) => {
      const className = cx(styles[`toc-${anchor.level}`], {
        [styles.active]: this.state.activeAnchor === anchor.href
      })

      return (
        <li
          key={anchor.href}
          className={className}
        >
          <a
            href={anchor.href}
            onClick={this.handleAnchorClick}
          >
            {anchor.text}
          </a>
        </li>
      )
    })
  }

  render () {
    return (
      <AutoAffix
        viewportOffsetTop={10}
        container={this.props.container}
        autoWidth={false}
      >
        <ul
          className={styles.ul}
          style={{maxWidth: '300px'}}
        >
          {this.getList()}
        </ul>
      </AutoAffix>
    )
  }
}
