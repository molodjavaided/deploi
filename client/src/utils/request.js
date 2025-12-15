// export async function request(path, method, data) {

//   const res = await fetch('http://localhost:3000/api' + path, {
//     headers: {
//       'content-type': 'application/json',
//     },
//     credentials: 'include',
//     method: method || 'GET',
//     body: data ? JSON.stringify(data) : undefined,
//   });
//   const data_1 = await res.json();
//   if (!res.ok) {
//     throw new Error(data_1.message || 'Ошибка сервера');
//   }
//   return await data_1;
// }
// utils/request.js

const API_URL = import.meta.env.VITE_API_URL

export function request(path, method, data) {
  return fetch(`${API_URL}` + path, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: method || 'GET',
    body: data ? JSON.stringify(data) : undefined,
  }).then(async (res) => {
    const contentType = res.headers.get('content-type');

    // Проверяем, что ответ - JSON
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Ожидался JSON, но получили: ${text.slice(0, 100)}...`);
    }

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || 'Ошибка сервера');
    }

    return responseData;
  });
}