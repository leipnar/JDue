// A simple API client to interact with the backend.

const API_BASE_URL = '/api'; // Use a relative path for proxying

const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('todo_auth_token');
};

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    // For 204 No Content
    if (response.status === 204) {
        return null;
    }

    return response.json();
};

export default apiFetch;
