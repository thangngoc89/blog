import React from 'react'
import { Route } from 'react-router'
import PageContainer from 'statinamic/lib/PageContainer'
import 'styles/global.styles'
// components
import Layout from 'containers/Layout'

// routes
export default (
  <Route component={Layout}>
    <Route path='*' component={PageContainer} />
  </Route>
)
