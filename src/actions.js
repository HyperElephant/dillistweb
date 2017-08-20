import fetcher from './fetcher';

const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const CURRENT_USER_WISHES = 'CURRENT_USER_WISHES';
const ADD_WISH = "ADD_WISH";
const REMOVE_WISH = "REMOVE_WISH";
const GET_USER_LIST = "GET_USER_LIST";

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

export function getCurrentUserWishes() {
    return({
        type: CURRENT_USER_WISHES,
        payload: fetcher.Wishes.current()
    })
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
