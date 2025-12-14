import { addProduct } from './session'
import { ROLEID } from '../constants'

export const createSession = (roleId) => {
    const session = {
        logout() {
            Object.keys(session).forEach((key) => {
                delete session[key];
            });
        },
    };

    switch (roleId) {
        case ROLEID.ADMIN: {
            session.addProduct = addProduct;
            break;
        }
        case ROLEID.CUSTOMER: {
            session.addProduct = addProduct;
            break;
        }
        default:
            // ничего не делать
    }

    return session
}
