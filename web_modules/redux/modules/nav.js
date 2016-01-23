import { createAction, handleActions } from 'redux-actions'
// ------------------------------------
// Constants
// ------------------------------------
export const SIDEBAR_TOGGLE = 'nav/sidebar/TOGGLE'
// ------------------------------------
// Actions
// ------------------------------------
export const sidebarToggle = createAction(SIDEBAR_TOGGLE)

export const actions = {
  sidebarToggle
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  isSidebarOpen: false
}

export default handleActions({
  [SIDEBAR_TOGGLE]: (state) => ({
    ...state,
    isSidebarOpen: !state.isSidebarOpen
  })
}, initialState)
