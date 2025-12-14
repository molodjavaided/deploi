import { generateDate } from "./generate-date";

export const addUser = (registerLogin, registerPassword) => fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            login: registerLogin,
            password: registerPassword,
            registeredAt: generateDate(),
            role_id: 2,
        })
    });