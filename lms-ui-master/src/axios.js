import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://192.168.168.69:8080/api/'
    baseURL : 'http://35.200.140.32:8080/lms/api/'
    //baseURL: 'https://jsonplaceholder.typicode.com'
    //baseURL: 'http://localhost:8085/lms/api/'
    
});

export default instance;