import React, { Component, PropTypes } from 'react'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import cx from 'classnames'
import smoothScroll from 'smoothscroll' // Auto bound to global click event
import _ from 'lodash'

import '../../utils/load-waypoints'
import styles from './Affix.scss'

/**
 * Debounce change location.hash with out scrolling or changing history
 * @return {void}
 */
const replaceHash = _.debounce((href) => {
  if (window.history.replaceState) {
    window.history.replaceState(null, null, href)
  }
}, 100)

/**
 * Get list of markdownIt-Anchor node
 * @return {array}
 */
const getAnchors = () => {
  const anchors = document.getElementsByClassName('markdownIt-Anchor')
  return Object.keys(anchors)
    .map((key) => anchors[key])
}

/**
 * Get processed list of anchor nodes
 * @return {array}
 */
const listAnchors = () => (
  getAnchors()
    .map((node) => ({
      level: node.parentNode.nodeName.toLowerCase(), // H1 -> h1
      href: node.getAttribute('href'),
      text: node.parentNode.innerHTML
        .replace(/(<([^>]+)>)/ig, '')
        .replace('#', '')
        .trim()
    }))
)

export default class PostAffixWrapper extends Component {
  static propTypes = {
    container: PropTypes.any,
    width: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      activeAnchor: ''
    }
    this.handleAnchorClick = this.handleAnchorClick.bind(this)
    this.updateHrefChange = this.updateHrefChange.bind(this)
  }

  componentDidMount () {
    this.attachWayPoints()
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
              me.updateHrefChange(this.element.getAttribute('href'))
            } else if (direction === 'up') {
              me.updateHrefChange(this.previous().element.getAttribute('href'))
            }
          }
        })
      )
  }

  updateHrefChange (href) {
    replaceHash(href)
    this.setState({
      activeAnchor: href
    })
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
          style={{width: this.props.width}}
        >
          {this.getList()}
        </ul>
      </AutoAffix>
    )
  }
}
