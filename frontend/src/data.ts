const querystring = require('querystring');

// Constants
export const api_url = 'http://localhost:4200/'; // .env

// Helpers
/**
 * Helper for fetching a GET HTTP request
 * @param url endpoint without initial '/'
 * @param params object containing parameters to be sent, they automatically get converted to string
 */
async function get(url: String, params: Object = {}) {
    const response = await fetch(api_url + url + querystring.stringify(params), {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
}

/**
 * Helper for fetching a POST HTTP request
 * @param url endpoint without initial '/'
 * @param body object containing the body
 * @param params object containing parameters to be sent, they automatically get converted to string
 */
async function post(url: String, body: Object, params: Object = {}) {
    const response = await fetch(api_url + url + querystring.stringify(params), {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
    return response.json();
}

/**
 * Login function
 * @param credentials {username, password}
 */
export function login(credentials: Object) {
    return get('users/login', credentials)
}

/**
 * Signup function
 * @param credentials {username, password}
 */
export function signup(credentials: Object) {
    console.log('signup')
    return post('users/signup', credentials)
}