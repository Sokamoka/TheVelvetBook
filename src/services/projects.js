const RandInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const fakeResolver = (t) => () => new Promise(resolve => {
  setTimeout(() => { resolve({ data: t }) }, RandInt(25, 2000))
})

const projectResponse = require('../assets/data/project.json')
export const getProject = fakeResolver(projectResponse)

const myProjectsResponse = require('../assets/data/myprojects.json')
export const getMyProjects = fakeResolver(myProjectsResponse)

const myCollectionsResponse = require('../assets/data/mycollections.json')
export const getMyColections = fakeResolver(myCollectionsResponse)

const myFavoritesResponse = require('../assets/data/myfavorites.json')
export const getMyFavorites = fakeResolver(myFavoritesResponse)

// const myFavoritesResponse = require('../assets/data/myfavorites.json')
export const getMyCollection = fakeResolver(myFavoritesResponse)

export const modifyProjectTitle = fakeResolver({})
export const modifyDescriptionTitle = fakeResolver({})
export const modifyImageTitle = fakeResolver({text: 'Modified!'})
export const updateProjectImage = fakeResolver({text: 'Modified Image List!'})
export const updateTagList = fakeResolver({id: 123})
export const updateCredits = fakeResolver({text: 'Update Credits!'})
export const activateImage = fakeResolver({text: 'Image Aktiv!'})
export const inactivateImage = fakeResolver({text: 'Image Inaktiv!'})

// nincs bekötve
