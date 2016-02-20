import React from 'react'
import { Route, browserHistory } from 'react-router'
import PageContainer from 'statinamic/lib/PageContainer'
import catchLinks from './catchLinks'

import '../styles/global.styles'
// components
import LayoutContainer from '../LayoutContainer'

if (typeof window !== 'undefined') {
  const article = document.getElementsByTagName('article')

  if (article) {
    catchLinks(article[0], (href) => {
      browserHistory.push(href)
    })
  }
}
// routes
export default (
  <Route component={LayoutContainer}>
    <Route path='*' component={PageContainer} />
  </Route>
)
