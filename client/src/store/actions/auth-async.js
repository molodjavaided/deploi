import { ROLEID } from "../../constants/role-id"
import { request } from "../../utils/request"
import { authActions } from "./auth-actions"
import { cartActions } from "./cart-actions"
import { fetchUserCart } from "./cart-async"

export const authUser = (login, password) => async (dispatch) => {
    dispatch(authActions.authLoginStart())
    try {
        const response = await request('/auth/login', "POST", { login, password });

        if (response.userData) {
            dispatch(authActions.authLoginSuccess(response.userData));
            await dispatch(fetchUserCart())
        } else {
            throw new Error(response.message || "Ошибка входа")
        }
    } catch (error) {
        dispatch(authActions.authLoginError(error.message))
    }
}

export const registerUser = (login, password) => async (dispatch) => {
    dispatch(authActions.authRegisterStart())

    try {
         const response = await request('/auth/register', "POST", { login, password });

        if (response.userData) {
            dispatch(authActions.authRegisterSuccess(response.userData))
            await dispatch(fetchUserCart())
            return response.userData
        } else {
            throw new Error(response.message || "Ошибка регистрации")
        }
    } catch (error) {
        const errorMessage = error.message || "Ошибка при регистрации"
        dispatch(authActions.authRegisterError(errorMessage))
        throw error
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        await request('/auth/logout', "POST")

    } catch (error) {
        console.log('Ошибка при выходе:', error.message);
    } finally {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');

        dispatch(cartActions.setCart({
            items: [],
            totalPrice: 0,
            totalQuantity: 0,
            cartId: null,
            userId: null
        }))

        dispatch(authActions.logout())
    }
}


export const checkAuth = () => async (dispatch) => {
    try {
        const response = await request('/auth/me')
        if (response.user) {
            dispatch(authActions.authLoginSuccess(response.user))
            await dispatch(fetchUserCart())
        } else {
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            dispatch(authActions.logout());
        }
    } catch (error) {
        console.log("Пользователь не авторизован", error.message);
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        dispatch(authActions.logout());
    }
}