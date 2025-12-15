const API_URL = import.meta.env.VITE_API_URL || 'http://5.129.215.5'

export function request(path, method, data) {
   const apiPath = path.startsWith('/api') ? path : `/api${path.startsWith('/') ? path : `/${path}`}`
  console.log('API_URL:', API_URL)

  return fetch(`${API_URL}${apiPath}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: method || 'GET',
    body: data ? JSON.stringify(data) : undefined,
  }).then(async (res) => {
    const contentType = res.headers.get('content-type')
    const text = await res.text()

    console.log('Response status:', res.status)
    console.log('Content-Type:', contentType)
    console.log('Response preview:', text.substring(0, 200))

    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Ожидался JSON, но получили: ${text.slice(0, 100)}...`)
    }

    const responseData = JSON.parse(text)

    if (!res.ok) {
      throw new Error(responseData.message || 'Ошибка сервера')
    }

    return responseData
  }).catch(error => {
    console.error('Request error:', error.message)
    throw error
  })
}