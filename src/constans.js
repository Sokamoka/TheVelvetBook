import axios from 'axios'

export const AVAILABLE_COUNTRIES = [
  'hungary', 'czech_republic', 'slovakia', 'romania', 'serbia', 'croatia', 'austria', 'poland'
]
export const AVAILABLE_CATEGORIES = [ 'photo', 'cakes', 'cinematography', 'decoration' ]

export const TOAST_GOAWAY_TIME = 2500
export const RESTORE_TOAST_GOAWAY_TIME = 10000

export const DEBOUNCE_TIME = 300

export default axios.defaults.baseURL = 'http://localhost:8000'
