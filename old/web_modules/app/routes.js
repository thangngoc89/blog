import React, { Component } from "react"
import { Route } from "react-router"
import PhenomicPageContainer from "phenomic/lib/PageContainer"
import "../styles/global.styles"

// components
import LayoutContainer from "../LayoutContainer"
import Page from "../layouts/Page"
import PageError from "../layouts/PageError"
import PageLoading from "../layouts/PageLoading"
import Post from "../layouts/Post"
import Homepage from "../routes/Homepage"
import Archive from "../routes/Archive"

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
          Post,
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
