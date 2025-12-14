import { ACTION_TYPE } from "../actions/actions-type";

const initialState = {
    user: null,
    isLoading: false,
    error: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTION_TYPE.AUTH_LOGIN_START:
        case ACTION_TYPE.AUTH_REGISTER_START:
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case ACTION_TYPE.AUTH_LOGIN_SUCCESS:
        case ACTION_TYPE.AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: null
            }

        case ACTION_TYPE.AUTH_LOGIN_ERROR:
        case ACTION_TYPE.AUTH_REGISTER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case ACTION_TYPE.AUTH_LOGOUT:
            return initialState

        case ACTION_TYPE.AUTH_CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:

            return state;
    }
}