import * as actions from '../constants/index'

export const username = (payload) => {
    return { type: actions.authActions.USERNAME, payload }
}

export const password = (payload) => {
    return { type: actions.authActions.PASSWORD, payload }
}

export const confirmPassword =(payload) => {
    return { type: actions.authActions.CONFIRM_PASSWORD, payload }
}

export const authenticatedUser = (payload) => {
    return { type: actions.authActions.AUTHENTICATED_USER, payload }
}

export const createUser = (payload) => {
    return { type: actions.authActions.CREATE_USER, payload }
}

export const checkLogin = (payload) => {
    return { type: actions.authActions.CHECK_LOGIN_STATE, payload }
}