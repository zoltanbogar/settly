import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8000/api',
	CancelToken: axios.CancelToken
});

export default instance;