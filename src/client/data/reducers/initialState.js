export default {
  projects: {
    projectList: [],
    stats: {
      activeProjectsCount: 0,
      totalProjectsCount: 0,
      collaboratorsCount: 0
    },
    projectPublished: 'not_started_yet',
    loading: true,
    draft: {
      title: '',
      abstract: '',
      stack: ''
    }
  },
  requests: {
    response: [],
    loading: true
  },
  viewProject: {
    collaborators: [],
    tags: [],
    stack: [],
    collaboratorRequirement: []
  },
  loggedIn: false,
  products: {
    productList: [],
    loading: false,
    saving: 'none',
    imageUploading: 'none',
    singleProduct: {}
  }
}
