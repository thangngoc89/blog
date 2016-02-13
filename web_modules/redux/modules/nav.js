// ------------------------------------
// Constants
// ------------------------------------
export const SIDEBAR_TOGGLE = 'nav/sidebar/TOGGLE'
// ------------------------------------
// Actions
// ------------------------------------
export const sidebarToggle = (value) => ({
  type: SIDEBAR_TOGGLE,
  payload: value
})

export const actions = {
  sidebarToggle
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIDEBAR_TOGGLE]: (state, { payload }) => {
    if (typeof payload === 'boolean') {
      if (payload === state.isSidebarOpen) {
        return state
      }
    }

    return {
      ...state,
      isSidebarOpen: !state.isSidebarOpen
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  isSidebarOpen: false
}

export default function navReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
