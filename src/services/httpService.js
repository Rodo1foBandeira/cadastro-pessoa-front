import axios from 'axios';

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || 'https://localhost:5001/api/';

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    axios: axios
};