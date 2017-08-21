import fetch from 'isomorphic-fetch';

const API_ROOT = 'http://server.dillist.com/api';
let token = null;

const requests = {
    post: (url, body) => fetch(`${API_ROOT}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'XMLHttpRequest': 'XMLHttpRequest',
            'authorization': `Token ${token}`
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
        }),
    delete: (url) => fetch(`${API_ROOT}${url}`, {
        method: 'DELETE',
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

const Wishes = {
    current: () =>
        requests.get('/wishes'),
    addWish: (title, url) =>
        requests.post('/wishes', {wish: {title: title, url: url}}),
    removeWish: (id) =>
        requests.delete('/wishes/' + id),
    userWishes: (username) =>
        requests.get('/wishes/' + username)
}

const Users = {
    all: () =>
        requests.get('/users'),
    user: (username) =>
        requests.get('/users/' + username)
};

export default {
    Auth,
    Wishes,
    Users,
    setToken: _token => { token = _token; }
};
