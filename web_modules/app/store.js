import { combineReducers } from 'redux'
import createStore from 'statinamic/lib/redux/createStore'
import * as statinamicReducers from 'statinamic/lib/redux/modules'
import rootReducers from '../redux/rootReducer'

const store = createStore(
  combineReducers({
    ...statinamicReducers,
    ...rootReducers
  }),
  { ...(typeof window !== 'undefined') && window.__INITIAL_STATE__ },
)

export default store
