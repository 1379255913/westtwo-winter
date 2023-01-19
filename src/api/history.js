import api from "./request.js";

export function getHistoryList(data){
  return api.get('user/history',{
    params: data
  })
}

export function deleteHistory(data){
  return api.delete('user/history',{
    data: data
  })
}

export function putFavMusic(data){
  return api.put('user/history/lc',data)
}
