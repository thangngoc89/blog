import React from 'react'
import { Route } from 'react-router'
import PageContainer from 'statinamic/lib/PageContainer'

import '../styles/global.styles'
// components
import LayoutContainer from '../LayoutContainer'

// routes
export default (
  <Route component={ LayoutContainer }>
    <Route path='*' component={ PageContainer } />
  </Route>
)
