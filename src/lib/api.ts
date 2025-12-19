const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Auth token management
export const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
};

export const setAuthToken = (token: string) => {
    localStorage.setItem('auth_token', token);
};

export const removeAuthToken = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
};

export const getUser = () => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
};

// API wrapper
export const api = {
    async fetch(endpoint: string, options: RequestInit = {}) {
        const token = getAuthToken();
        const headers: HeadersInit = {
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Don't set Content-Type for FormData
        if (!(options.body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        // Handle 401 Unauthorized
        if (response.status === 401) {
            removeAuthToken();
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }

        return response;
    },

    async get(endpoint: string) {
        const response = await this.fetch(endpoint);
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        return response.json();
    },

    async post(endpoint: string, data: any) {
        const body = data instanceof FormData ? data : JSON.stringify(data);
        const response = await this.fetch(endpoint, {
            method: 'POST',
            body,
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API Error');
        }
        return response.json();
    },

    async put(endpoint: string, data: any) {
        // For FormData with Laravel, use POST with _method=PUT
        if (data instanceof FormData) {
            data.append('_method', 'PUT');
            return this.post(endpoint, data);
        }

        const response = await this.fetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API Error');
        }
        return response.json();
    },

    async delete(endpoint: string) {
        const response = await this.fetch(endpoint, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API Error');
        }
        return response.json();
    },
};
