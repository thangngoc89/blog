import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import styles from './SearchForm.scss'
import Icon from '../Icon'

export default class SearchFrom extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleToggleSearch: PropTypes.func.isRequired
  };

  render () {
    const divClass = cx(styles.search, {
      [styles.open]: this.props.open
    })
    return (
      <div className={divClass}>
        <a
          className={styles.close}
          onClick={() => this.props.handleToggleSearch(false)}
        >
          <Icon icon='cancel-circled' />
        </a>

        <div className='row'>
          <div className={styles.form}>
            <form>
              <input
                type='search'
                className={styles.input}
                placeholder='nhập từ khóa'
              />
              <button type='submit' className={styles.btn}>search</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
