import { ACTION_TYPE } from "./actions-type";

export const authActions = {
    authLoginStart: () => ({
        type: ACTION_TYPE.AUTH_LOGIN_START
    }),

    authLoginSuccess: (user) => ({
        type: ACTION_TYPE.AUTH_LOGIN_SUCCESS,
        payload: user
    }),

    authLoginError: (error) => ({
        type: ACTION_TYPE.AUTH_LOGIN_ERROR,
        payload: error
    }),

    authRegisterStart: () => ({
        type: ACTION_TYPE.AUTH_REGISTER_START
    }),

    authRegisterSuccess: (user) => ({
        type: ACTION_TYPE.AUTH_REGISTER_SUCCESS,
        payload: user
    }),

    authRegisterError: (error) => ({
        type: ACTION_TYPE.AUTH_REGISTER_ERROR,
        payload: error
    }),

    logout: () => ({
        type: ACTION_TYPE.AUTH_LOGOUT
    }),

    clearError: () => ({
        type: ACTION_TYPE.AUTH_CLEAR_ERROR
    })
}