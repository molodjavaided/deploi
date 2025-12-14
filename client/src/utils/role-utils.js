import { ROLEID } from "../constants/role-id"

export const isAdmin = (user) => {
    return user && user.role === ROLEID.ADMIN;
}

export const isUser = (user) => {
    return user && user.role === ROLEID.USER;
}

export const isGuest = (user) => {
    return !user;
}
