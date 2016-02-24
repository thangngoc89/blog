import LayoutContainer from './LayoutContainer'
import { connect } from 'react-redux'

export default connect(
  ({ pages }) => {
    const loadingPages = Object.keys(pages)
      .find((key) => {
        const page = pages[key]
        return page.hasOwnProperty('loading') && page.loading
      })

    return {
      isLoading: typeof loadingPages === 'string'
    }
  }
)(LayoutContainer)
