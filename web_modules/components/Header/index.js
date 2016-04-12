/* eslint-disable react/no-multi-comp */
import React, { Component } from "react"
import Link from "statinamic/lib/Link"
import Headroom from "react-headroom"
import styles from "./index.css"
import Icon from "../Icon"

class Header extends Component {
  render() {
    return (
      <div className={ styles.bar }>
        <div className={ styles.name }>
          <Link to="/">Khoa Nguyen</Link>
        </div>

        <Link
          activeClassName={ styles.itemActive }
          className={ styles.item }
          to="/archive/"
        >
          <Icon icon="bookmark" />
          <span>Bài viết</span>
        </Link>

        <Link
          activeClassName={ styles.itemActive }
          className={ styles.item }

          to="/about/"
        >
          <Icon icon="user" />
          <span>Giới thiệu</span>
        </Link>

        <a
          href="https://github.com/thangngoc89"
          target="_blank"
          className={ styles.item }
        >
          <Icon icon="github" />
          <span>Github</span>
        </a>

        <div className={ styles.search }>
          <input type="search" placeholder="search..." />
        </div>
      </div>
    )
  }
}

export default class HeadroomHeader extends Component {
  render() {
    return (
      <Headroom
        wrapperStyle={ { marginBottom: "2rem" } }
        style={ {
          background: "#0275d8",
          boxShadow: "1px 2px 2px #aaa",
        } }
      >
        <Header />
      </Headroom>
    )
  }
}
