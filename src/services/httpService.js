import axios from 'axios';

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || 'http://localhost:3004';

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    axios: axios
};