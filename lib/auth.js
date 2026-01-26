// Authentication utilities

export const setToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('adminToken', token)
    }
}

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('adminToken')
    }
    return null
}

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken')
    }
}

export const isAuthenticated = () => {
    return !!getToken()
}

export const logout = () => {
    removeToken()
    if (typeof window !== 'undefined') {
        window.location.href = '/admin/login'
    }
}
