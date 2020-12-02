const querystring = require('querystring');

// Constants that should be on an .env file but won't since it's local and otherwise I will need to provide the .env
export const api_url = 'http://localhost:4200/'; // .env

// Helpers
/**
 * 
 * @param {string} url Url string without the starting '/'
 * @param {object} params object containing parameters to be sent, they automatically get converted to string
 */
async function get (url, params) {
    const response = await fetch(api_url + url + querystring.stringify(params), {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
}

async function post (url, body) {
    const response = await fetch(api_url + url, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
    return response.json();
}

export function login(credentials) {
    return post('user/login', credentials)
}

export function signup(credentials) {
    return post('user/signup', credentials)
}