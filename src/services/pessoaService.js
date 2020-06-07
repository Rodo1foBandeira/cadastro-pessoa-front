import http from './httpService';

export function getPessoa(id) {
  if (id)
    return http.get(`pessoa/${id}`);    
  else
    return http.get('pessoa');
}

export function savePessoa(params) {  
  if (params.id)
    return http.put('pessoa', params);
  else
    return http.post('pessoa', params);
}

export function deletePessoa(id) {
  return http.delete(`pessoa/${id}`)
}