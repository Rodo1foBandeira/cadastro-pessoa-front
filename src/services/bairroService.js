import http from './httpService';

export function getBairros(params) {
  return http.get('bairro');
}