import api from "./request.js";


export function getSearchList(data) {
  return api.get('search',{
    params: data
  })
}

export function downloadMusic(rid) {
  return api.get(`search/download/${rid}`, {
    responseType: "blob"
  })
}

