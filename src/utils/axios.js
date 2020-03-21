import axios from 'axios'

const axiosClient = axios.create({ baseURL: "https://sheetsu.com/apis/v1.0su/1437841cd0c8", });
axiosClient.defaults.headers.post['Content-Type'] = 'application/json'

export default axiosClient
