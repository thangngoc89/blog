import React, { Component } from "react"
import { Route } from "react-router"
import PhenomicPageContainer from "phenomic/lib/PageContainer"
import Homepage from "../routes/Homepage"
import Archive from "../routes/Archive"
import "../styles/global.styles"

// components
import LayoutContainer from "../LayoutContainer"
import Page from "../layouts/Page"
import PageError from "../layouts/PageError"
import PageLoading from "../layouts/PageLoading"

class PageContainer extends Component {
  render() {
    const { props } = this
    return (
      <PhenomicPageContainer
        { ...props }
        layouts={ {
          Page,
          PageError,
          PageLoading,
          Homepage,
          Archive,
        } }
      />
    )
  }
}

// routes
export default (
  <Route component={ LayoutContainer }>
    <Route path="/" component={ Homepage } />
    <Route path="/archive" component={ Archive } />
    <Route path="*" component={ PageContainer } />
  </Route>
)
