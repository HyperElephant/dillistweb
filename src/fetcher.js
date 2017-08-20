import fetch from 'isomorphic-fetch';

const API_ROOT = 'http://server.dillist.com/api';
let token = null;

const requests = {
    post: (url, body) => fetch(`${API_ROOT}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'XMLHttpRequest': 'XMLHttpRequest'
        },
        body: JSON.stringify(body)
    }).then(function(response){
            return response.json();
        }).catch(function(error){
            console.log(error);
        }),

    get: (url) => fetch(`${API_ROOT}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'authorization': `Token ${token}`
        }
    }).then(function(response){
            return response.json();
        }).catch(function(error){
            console.log(error);
        })
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) => 
        requests.post('/users/login', {user: {email: email, password: password}}),
    register: (username, email, password) => 
        requests.post('/users', {user: {username: username, email: email, password: password}})
};

export default {
    Auth,
    setToken: _token => { token = _token; }
};
