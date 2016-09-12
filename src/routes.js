import React, { Component } from "react"
import { Route } from "react-router"

import AppContainer from "./AppContainer"
import { PageContainer as PhenomicPageContainer } from "phenomic"

import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import PageLoading from "./layouts/PageLoading"
import Homepage from "./layouts/Homepage"
import Archive from "./layouts/Archive"
import Post from "./layouts/Post"
import Tag from "./layouts/Tag"

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
          Post,
        } }
        logger={ {
          ...console,
          info: () => {},
        } }
      />
    )
  }
}

export default (
  <Route component={ AppContainer }>
    <Route path="tag/:tag" component={ Tag } />
    <Route path="*" component={ PageContainer } />
  </Route>
)
