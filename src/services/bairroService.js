import http from './httpService';

export function getBairro(id) {
  if (id)
    return http.get(`bairro/${id}`);    
  else
    return http.get('bairro');
}

export function saveBairro(params) {  
  if (params.id)
    return http.put('bairro', params);
  else
    return http.post('bairro', params);
}

export function deleteBairro(id) {
  return http.delete(`bairro/${id}`)
}