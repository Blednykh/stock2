import axios from 'axios';

const backRequest = axios.create({
    baseURL: 'http://localhost:8080/'
});

export default backRequest;
