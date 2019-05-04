var utils = require('../../utils')
var apiConfig = require('./ApiConfig')

class ProjectsApi {
  static requestHeaders () {
    console.log('token 1234 ::', utils.getLocalStorageItem('token'))
    return {
      'Authorization': utils.getLocalStorageItem('token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  static getAllTodos () {
    const headers = Object.assign({ 'Content-Type': 'application/json' })
    return window.fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
      .then(
        (result) => {
          console.log('result :: ', result)
          return result
        },
        (error) => {
          console.log('error', error)
        })
  }

  static getAllProjects () {
    const headers = this.requestHeaders()
    let uri = apiConfig.getApiHost() + '/ideas'
    return window.fetch(uri, {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          return error
        })
  }

  static getAllDrafts () {
    console.log('Coming in all of the draft function...')
    const headers = this.requestHeaders()

    let uri = new URL(apiConfig.getApiHost() + '/ideas?filter={"ownerId":' + utils.getUserEmailId() + '}')
    uri = uri.search
    return window.fetch(uri, {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
      .then(
        (result) => {
          console.log('All drafts :: ', result)
          return result
        },
        (error) => {
          return error
        })
  }

  static getSingleProject (projectId) {
    const headers = this.requestHeaders()
    let uri = apiConfig.getApiHost() + '/ideas/' + projectId
    return window.fetch(uri, {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          return error
        })
  }

  static postProject (project) {
    const headers = this.requestHeaders()
    let uri = apiConfig.getApiHost() + '/ideas'
    return window.fetch(uri, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(project)
    }).then(res => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          return error
        })
  }

  static generateDraft () {
    const headers = this.requestHeaders()
    let uri = apiConfig.getApiHost() + '/ideas'
    let payload = {
      'title': '',
      'abstract': '',
      'stack': []
    }
    return window.fetch(uri, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    }).then(res => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          return error
        })
  }

  static retrieveDraft (draftId) {
    const headers = this.requestHeaders()
    let uri = apiConfig.getApiHost() + '/ideas/' + draftId
    return window.fetch(uri, {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          return error
        })
  }

  static updateDraft (draft) {
    const headers = this.requestHeaders()
    let uri = apiConfig.getApiHost() + '/ideas/' + draft.id
    let updatedDraft = {
      'title': draft.title,
      'abstract': draft.abstract,
      'stack': draft.stack
    }
    return window.fetch(uri, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(updatedDraft)
    }).then(res => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          return error
        })
  }

  static publishProject (draft) {
    const headers = this.requestHeaders()
    let uri = apiConfig.getApiHost() + '/postIdea'
    let publishIdea = {
      'ideaId': draft.id
    }
    return window.fetch(uri, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(publishIdea)
    }).then(res => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          return error
        })
  }

  static getTotalProjectsCount () {
    const headers = this.requestHeaders()
    let uri = apiConfig.getApiHost() + '/ideas/stats'
    return window.fetch(uri, {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          return error
        })
  }
  static getUsersCount () {
    const headers = this.requestHeaders()
    let uri = apiConfig.getApiHost() + '/users/stats'
    return window.fetch(uri, {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
      .then(
        (result) => {
          return result
        },
        (error) => {
          return error
        })
  }
}

export default ProjectsApi
