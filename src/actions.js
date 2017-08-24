import fetcher from './fetcher';

const LOGIN= 'LOGIN';
const REGISTER = 'REGISTER';
const USER_WISHES = 'USER_WISHES';
const ADD_WISH = "ADD_WISH";
const REMOVE_WISH = "REMOVE_WISH";
const GET_USER_LIST = "GET_USER_LIST";
const GET_USER_PROFILE = 'GET_USER_PROFILE';
const APP_LOAD = 'APP_LOAD';
const LOGOUT = 'LOGOUT';

export function appLoad(token) {
    fetcher.setToken(token);
    return(
    { 
        type: APP_LOAD, 
        payload: fetcher.Auth.current(),
        token: token 
    });
}

export function login(email, password){
    return(
    { 
        type: LOGIN, 
        payload: fetcher.Auth.login(email, password)
    });
}

export function register(username, email, password){
    return(
    { 
        type: REGISTER, 
        payload: fetcher.Auth.register(username, email, password)
    });
}

export function getUserWishes(username) {
    return({
        type: USER_WISHES,
        payload: username ? fetcher.Wishes.userWishes(username) : fetcher.Wishes.current()
    });
}

export function addWish(title, url){
    return(
    { 
        type: ADD_WISH, 
        payload: fetcher.Wishes.addWish(title, url)
    });
}

export function removeWish(id){
    return(
    { 
        type: REMOVE_WISH, 
        payload: fetcher.Wishes.removeWish(id)
    });
}

export function getUserList() {
    return({
        type: GET_USER_LIST,
        payload: fetcher.Users.all()
    })
}

export function getUserProfile(username) {
    return({
        type: GET_USER_PROFILE,
        payload: fetcher.Users.user(username)
    })
}

export function logout() {
    return ({
        type: LOGOUT
    })
}

export {
    LOGIN,
    REGISTER,
    USER_WISHES,
    ADD_WISH,
    REMOVE_WISH,
    GET_USER_LIST,
    GET_USER_PROFILE,
    APP_LOAD,
    LOGOUT,
}