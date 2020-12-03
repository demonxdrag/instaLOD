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
    const queryParams = params ? `?${querystring.stringify(params)}` : '';
    const queryUrl = api_url + url + queryParams;
    const response = await fetch(queryUrl, {
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
    const queryParams = params ? `?${querystring.stringify(params)}` : '';
    const queryUrl = api_url + url + queryParams;
    const response = await fetch(queryUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
    return response.json();
}

/**
 * Helper for uploading files
 * @param url endpoint without initial '/'
 * @param file file object
 * @param params object containing parameters to be sent, they automatically get converted to string
 */
async function upload(url: String, file: File, params: Object = {}) {

}

/**
 * Login function
 * @param credentials {username, password}
 */
export function login(credentials: Object) {
    console.log('login')
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