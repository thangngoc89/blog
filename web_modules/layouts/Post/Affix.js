import React, { Component, PropTypes } from 'react'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import styles from './Affix.scss'
import cx from 'classnames'

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
        text: node.nextSibling.nodeValue.trim()
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
    getAnchors()
      .forEach((element) =>
        new window.Waypoint({
          element,
          handler: (/* direction */) => {
            this.setState({
              activeAnchor: element.getAttribute('href')
            })
          }
        })
      )
  }

  /**
   * Set anchor active state when click on anchor link
   * @param  {string} href
   */
  handleAnchorClick (href) {
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
            onClick={() => this.handleAnchorClick(anchor.href)}
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
          style={{maxWidth: '350px'}}
        >
          {this.getList()}
        </ul>
      </AutoAffix>
    )
  }
}
