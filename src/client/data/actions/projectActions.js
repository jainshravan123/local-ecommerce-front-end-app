import * as types from './actionTypes'
import ProjectsApi from '../api/ProjectsApi'

export function todosSuccess (projects) {
  return { type: types.FETCH_ALL_PROJECTS_REQUEST_SUCCESS, payload: projects }
}

export function loadProjectRequest () {
  return { type: types.LOAD_ALL_PROJECTS_REQUEST, payload: 'LOAD_ALL_PROJECTS_REQUEST' }
}

export function loadProjectsSuccess (projects) {
  return { type: types.LOAD_ALL_PROJECTS_REQUEST_SUCCESS, payload: projects }
}

export function requestProjectsStats () {
  return { type: types.REQUEST_PROJECT_STATS, payload: 'REQUESTING_STATS' }
}

export function requestProjectsStatsSuccess (stats) {
  return { type: types.REQUEST_PROJECT_STATS_SUCCESS, payload: stats }
}

export function postProjectSuccess (postProjectResponse) {
  return { type: types.POST_PROJECT_SUCCESS, payload: postProjectResponse }
}

export function publishProjectSuccess (publishProjectResponse) {
  return { type: types.PUBLISH_PROJECT_SUCCESS, payload: 'PUBLISHED_SUCCESSFULLY' }
}

export function resetPublishedProjectState () {
  return { type: types.RESET_PUBLISHED_PROJECT_STATE, payload: true }
}

export function generateDraftSuccess (draft) {
  return { type: types.GENERATE_DRAFT_SUCCESS, payload: draft }
}

export function retrieveDraftSuccess (draft) {
  console.log('retrieveDraftSuccess : ' + JSON.stringify(draft))
  return { type: types.GENERATE_DRAFT_SUCCESS, payload: draft }
}

export function updateDraftSuccess (draft) {
  return { type: types.UPDATE_DRAFT_SUCCESS, payload: draft }
}

export function loadTodos () {
  return function (dispatch) {
    return ProjectsApi.getAllTodos().then(todos => {
      dispatch(todosSuccess(todos))
    }).catch(error => {
      throw (error)
    })
  }
}

export function loadProjects () {
  console.log('Coming in loadProjects')
  return function (dispatch) {
    dispatch(loadProjectRequest())
    return ProjectsApi.getAllProjects().then(projects => {
      dispatch(loadProjectsSuccess(projects))
      console.log('Load projects successfully')
    }).catch(error => {
      throw (error)
    })
  }
}

export function loadDrafts () {
  console.log('Coming in loadDrafts')
  return function (dispatch) {
    return ProjectsApi.getAllDrafts().then(drafts => {
    }).catch(error => {
      throw (error)
    })
  }
}

export function calculateStats () {
  console.log('Calculating stats')
  return function (dispatch) {
    dispatch(requestProjectsStats())
    let totalCountpromise = ProjectsApi.getTotalProjectsCount()
    let userCountPromise = ProjectsApi.getUsersCount()
    Promise.all(
      [totalCountpromise, userCountPromise])
      .then((val) => {
        let stats = {
          totalProjectsCount: val[0],
          collaboratorsCount: val[1]
        }
        console.log('Received stats to be updated', stats)
        dispatch(requestProjectsStatsSuccess(stats))
      }).catch(error => {
        throw (error)
      })
  }
}

export function postProject (project) {
  return function (dispatch) {
    return ProjectsApi.postProject(project).then(postProjectResponse => {
      console.log('postProjectResponse ::: ' + JSON.stringify(postProjectResponse))
      dispatch(postProjectSuccess(postProjectResponse))
    }).catch(error => {
      throw (error)
    })
  }
}

export function generateDraft (history) {
  return function (dispatch) {
    return ProjectsApi.generateDraft().then(draft => {
      dispatch(generateDraftSuccess(draft))
      history.push(`/drafts/${draft.id}`)
    }).catch(error => {
      throw (error)
    })
  }
}

export function retrieveDraft (draftId) {
  return function (dispatch) {
    return ProjectsApi.retrieveDraft(draftId).then(draft => {
      dispatch(retrieveDraftSuccess(draft))
    }).catch(error => {
      throw (error)
    })
  }
}

export function updateDraft (draft) {
  return function (dispatch) {
    return ProjectsApi.updateDraft(draft).then(updatedDraft => {
      dispatch(updateDraftSuccess(updatedDraft))
    }).catch(error => {
      throw (error)
    })
  }
}

export function publishDraft (draft) {
  return function (dispatch) {
    return ProjectsApi.updateDraft(draft).then(updatedDraft => {
      return ProjectsApi.publishProject(updatedDraft).then(publishProjectResponse => {
        dispatch(publishProjectSuccess())
      }).catch(error => {
        throw (error)
      })
    }).catch(error => {
      throw (error)
    })
  }
}
