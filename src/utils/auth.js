const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';

const REFRESH_TOKEN_KEY = 'refresh_token';

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
    return localStorage.removeItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(token) {
    return localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function removeRefreshToken() {
    return localStorage.removeItem(REFRESH_TOKEN_KEY);
}

const USERNAME_KEY = 'username';

export function getRole() {
    return localStorage.getItem(ROLE_KEY);
}

export function setRole(role) {
    return localStorage.setItem(ROLE_KEY, role);
}

export function removeRole() {
    return localStorage.removeItem(ROLE_KEY);
}

export function getUsername() {
    return localStorage.getItem(USERNAME_KEY);
}

export function setUsername(username) {
    return localStorage.setItem(USERNAME_KEY, username);
}

export function removeUsername() {
    return localStorage.removeItem(USERNAME_KEY);
}

export function clearAuth() {
    removeToken();
    removeRefreshToken();
    removeRole();
    removeUsername();
}
