import { combineReducers } from 'redux'
import createStore from 'statinamic/lib/redux/createStore'
import * as statinamicReducers from 'statinamic/lib/redux/modules'
import rootReducer from 'redux/rootReducer'
import minifyCollection from 'statinamic/lib/md-collection-loader/minify'

import * as layouts from 'containers'

const initialState = {
  // static build optimization
  ...__PROD__ && {
    collection:
      minifyCollection(require('statinamic/lib/md-collection-loader/cache'))
  },
  ...(typeof window !== 'undefined') && window.__INITIAL_STATE__,
  layouts
}

const reducer = combineReducers({
  ...statinamicReducers,
  ...rootReducer
})

const store = createStore(reducer, initialState)

export default store
