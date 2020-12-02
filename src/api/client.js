// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const base_url = 'http://193.124.114.46:3001/'

  let full_endpoint = `${base_url}${endpoint}`

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await window.fetch(full_endpoint, config)
    //data = await response.json()   
    data = await response.text()
    if (response.ok) {
      return data
    }
    console.log('response.statusText', response.statusText)
    throw new Error(response.statusText + ": " + data)
  } catch (err) {
    let res = Promise.reject(err.message ? err.message : data)
    return res
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body })
}

client.auth_get = function (endpoint, token_id, customConfig = {}) {
//The secret token should be taken from the Redux store - not from the local storage
  customConfig.headers = {'Authorization': `Bearer ${token_id}`}

  return client.get(endpoint, customConfig)
}

client.auth_post = function (endpoint, body, token_id, customConfig = {}) {  
//The secret token should be taken from the Redux store - not from the local storage
  customConfig.headers = {'Authorization': `Bearer ${token_id}`}

  return client.post(endpoint, body, customConfig)
}
