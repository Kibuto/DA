import { HOST } from '../key';

export const fetchAPINormal = (endpoint, method = 'GET', body = null) => {
    return fetch(`${HOST}/${endpoint}`, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: !body ? null : JSON.stringify({body})
            })
}

export const fetchAPIAuthentication = (endpoint, method = 'GET', body = null, bearer) => {
    return fetch(`${HOST}/${endpoint}`, {
                method,
                headers: new Headers({
                    'Authorization': bearer,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                body: !body ? null : JSON.stringify({body})
            })
}