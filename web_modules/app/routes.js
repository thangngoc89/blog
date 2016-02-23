import React from 'react'
import { Route } from 'react-router'
import PageContainer from 'statinamic/lib/PageContainer'
import Homepage from '../routes/Homepage'
import Archive from '../routes/Archive'
import '../styles/global.styles'

// components
import LayoutContainer from '../LayoutContainer'

// routes
export default (
  <Route component={LayoutContainer}>
    <Route path='/' component={Homepage} />
    <Route path='/archive' component={Archive} />
    <Route path='*' component={PageContainer} />
  </Route>
)
