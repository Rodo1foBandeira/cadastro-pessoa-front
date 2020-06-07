import http from './httpService';

export function getUf(id) {
  if (id)
    return http.get(`uf/${id}`);    
  else
    return http.get('uf');
}

export function saveUf(params) {  
  if (params.id)
    return http.put('uf', params);
  else
    return http.post('uf', params);
}

export function deleteUf(id) {
  return http.delete(`uf/${id}`)
}