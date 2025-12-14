import { getUser } from "./get-user";
import { addUser } from "./add-user";
import { createSession } from "./create-session";

export const server = {
    async authorize(authorizeLogin, authorizePassword) {
        try {
            const user = await getUser(authorizeLogin);

            if (!user) {
                return {
                    error: 'Такой пользователь не найдет',
                    response: null,
                };
            }

            if (authorizePassword !== user.password)  {
                return {
                error: 'Неверный пароль',
                response: null,
                };
            }

                return {
                    error: null,
                    response: createSession(user.role_id),
                    user: { login: user.login }
                };
        } catch (error) {
                return {
                    error: 'Ошибка сервера',
                    response: null,
                };
            }
        },

    async register(registerLogin, registerPassword) {
        try {
        const user = await getUser(registerLogin);

            if (user) {
                return {
                    error: 'Такой логин уже занят',
                    response: null,
                };
            }

            await addUser(registerLogin, registerPassword)

            const newUser = await getUser(registerLogin);

            return {
                error: null,
                response: createSession(newUser ? newUser.role_id : 2),
                user: {login: registerLogin}
            };
        } catch (error) {
            return {
                error: 'Ошибка сервера',
                response: null,
            };
        }
    }
};