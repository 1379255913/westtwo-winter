import api from "./request.js";


export function getSearchList(data) {
  return api.get('search',{
    params: data
  })
}

export function downloadMusic(data) {
  return api.get('search/download')
}

