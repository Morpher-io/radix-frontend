// api.ts file
import axios from 'axios';
const instance = axios.create({
  baseURL: import.meta.env.VITE_SAMPLE_API_ENDPOINT,
});
export default instance
