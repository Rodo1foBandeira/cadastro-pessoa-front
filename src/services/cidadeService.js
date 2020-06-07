import http from './httpService';

export function getCidade(id) {
  if (id)
    return http.get(`cidade/${id}`);    
  else
    return http.get('cidade');
}

export function saveCidade(params) {  
  if (params.id)
    return http.put('cidade', params);
  else
    return http.post('cidade', params);
}

export function deleteCidade(id) {
  return http.delete(`cidade/${id}`)
}