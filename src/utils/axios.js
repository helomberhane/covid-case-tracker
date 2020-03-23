import axios from 'axios'

const axiosClient = axios.create();
axiosClient.defaults.headers.post['Content-Type'] = 'application/json'

export default axiosClient
