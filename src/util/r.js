import axios from 'axios';
const r = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 1000,
})
export default r;