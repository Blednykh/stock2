import axios from 'axios';

const tomorrowRequest = axios.create({
    baseURL: 'http://localhost:8080/'
});

export default tomorrowRequest;
