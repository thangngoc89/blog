import React from 'react'
import styles from './PageLoading.scss'

// http://codepen.io/supah/pen/JYgqRK
const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ball1}></div>
      <div className={styles.ball2}></div>
      <div className={styles.ball3}></div>
    </div>
  )
}

export default Loading
