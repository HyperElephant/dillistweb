import fetch from 'node-fetch';

const API_ROOT = 'http://server.dillist.com/api';
let token = null;

const requests = {
    post: (url, body) => fetch(`${API_ROOT}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'authorization': `Token ${token}`
        },
        body: JSON.stringify({
            body
        })
    }).then(function(response){
            return response.json();
        }),
    get: (url) => fetch(`${API_ROOT}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'authorization': `Token ${token}`
        }
    }).then(function(response){
            return response.json();
        })
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) => 
        requests.post('/users/login', {user: {email, password}}),
    register: (username, email, password) =>
        requests.post('/users', {user: {username, email, password}})
};

export default {
    Auth,
    setToken: _token => { token = _token; }
};