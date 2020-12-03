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
    console.log(response.status);
    if (response.status === 200) {
        return response.json();
    } else {
        console.error(response);
    }
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
        body: JSON.stringify(body)
    });
    console.log(response.status);
    if (response.status === 200) {
        return response.json();
    } else {
        console.error(response);
    }
}

/**
 * Helper for fetching a POST HTTP request
 * @param url endpoint without initial '/'
 * @param body object containing the body
 * @param params object containing parameters to be sent, they automatically get converted to string
 */
async function put(url: String, body: Object, params: Object = {}) {
    const queryParams = params ? `?${querystring.stringify(params)}` : '';
    const queryUrl = api_url + url + queryParams;
    const response = await fetch(queryUrl, {
        method: 'PUT',
        mode: 'cors',
        cache: 'default',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    console.log(response.status);
    if (response.status === 200) {
        return response.json();
    } else {
        console.error(response);
    }
}

/**
 * Helper for uploading files
 * @param url endpoint without initial '/'
 * @param file file object
 * @param params object containing parameters to be sent, they automatically get converted to string
 */
async function upload(url: String, file: File, params: Object = {}) {
    const queryParams = params ? `?${querystring.stringify(params)}` : '';
    const queryUrl = api_url + url + queryParams;
    const response = await fetch(queryUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: file
    });
    console.log(response.status);
    if (response.status === 200) {
        return response.json();
    } else {
        console.error(response);
    }
}

// USER FUNCTIONS //

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
    return post('users/signup', credentials)
}

// FILE FUNCTIONS //

/**
 * Upload a file function
 * @param file single file
 */
export function uploadFile(file: File) {
    let username = localStorage.getItem('username')
    return upload('files/upload', file, { username });
}

/**
 * Get all the files for the current user or for a given user
 * @param user username for the user to be sent for the query
 */
export function getUserFiles(user: String = '') {
    let username = user ? user : localStorage.getItem('username')
    return get('files', { username });
}

/**
 * Function that updates a file's metadata
 * @param metadata File metadata to change 
 * @param file_id File ID
 */
export function updateFile(metadata: Object, file_id: Number) {
    return put('files', metadata, {file_id});
}