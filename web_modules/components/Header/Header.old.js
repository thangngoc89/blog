import React, { Component } from "react"
import { Link } from "statinamic/lib/Link"
import styles from "./Header.scss"
import Icon from "../Icon"
// import SearchForm from '../SearchForm'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
    this.handleToggleSearch = this.handleToggleSearch.bind(this)
  }

  handleToggleSearch(open = !this.state) {
    this.setState({
      open,
    })
  }

  render() {
    return (
      <nav className={ styles.nav }>
        {/*
          <SearchForm
            open={this.state.open}
            handleToggleSearch={this.handleToggleSearch}
          />
        */}
        <div className="container">
          <Link
            className={ styles.brand }
            to="/"
          >
            Khoa Nguyen
          </Link>
          <a
            href="https://github.com/thangngoc89"
            target="_blank"
            className={ styles.navLink }
          >
            <Icon icon="github" />
          </a>
          <Link
            className={ styles.navLink }
            activeClassName={ styles.navLinkActive }
            to="/about/"
          >
            <Icon icon="user" />
            <span>Giới thiệu</span>
          </Link>
          <Link
            className={ styles.navLink }
            activeClassName={ styles.navLinkActive }
            to="/archive/"
          >
            <Icon icon="bookmark" />
            <span>Bài viết</span>
          </Link>
          {/*
            <button
              className={styles.navLink}
              onClick={() => this.handleToggleSearch(true)}
            >
              <Icon icon='search' />
              <span>Tìm kiếm</span>
            </button>
          */}
        </div>
      </nav>
    )
  }
}
