import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function projectReducer (state = initialState.projects, action) {
  switch (action.type) {
    case types.LOAD_ALL_PROJECTS_REQUEST:
      return Object.assign({}, state, { loading: true })
    case types.LOAD_ALL_PROJECTS_REQUEST_SUCCESS:
      return Object.assign({}, state, { projectList: action.payload, loading: false })
    case types.PUBLISH_PROJECT_SUCCESS:
      return Object.assign({}, state, { projectPublished: 'done' })
    case types.RESET_PUBLISHED_PROJECT_STATE:
      return Object.assign({}, state, { projectPublished: initialState.projects.projectPublished })
    case types.GENERATE_DRAFT_SUCCESS:
      return Object.assign({}, state, { draft: action.payload })
    case types.UPDATE_DRAFT_SUCCESS:
      console.log('draft updation : after : ' + JSON.stringify(action.payload))
      return Object.assign({}, state, { draft: action.payload })
    case types.REQUEST_PROJECT_STATS:
      console.log('Updating stats to UI')
      return Object.assign({}, state)
    case types.REQUEST_PROJECT_STATS_SUCCESS:
      console.log('Updating stats to UI')
      return Object.assign({}, state, { stats: action.payload })
    default:
      return state
  }
}
