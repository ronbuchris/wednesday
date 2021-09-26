import { userService } from "../../services/user.service";

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            console.log('Cannot login', err)
        }
    }
}

export function getById(userId) {
    return async (dispatch) => {
        const user = await userService.getById(userId)
        dispatch({
            type: 'SET_MEMBER',
            user
        })

    }

}

export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            console.log('Cannot signup', err)
        }

    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            console.log('Cannot logout', err)
        }
    }
}


export function loadUsers() {
    return async dispatch => {
        try {
            const users = await userService.query()
            console.log(`users`, users)
            dispatch({
                type: 'SET_USERS',
                users
            })
        } catch (err) {
            console.log('Cannot load users', err)
        }
    }
}