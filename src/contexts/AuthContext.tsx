'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, setAuthToken, removeAuthToken, getUser, setUser } from '@/lib/api';
import { mockApiResponses } from '@/lib/mockData';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const storedUser = getUser();
        if (storedUser) {
            setUserState(storedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // TODO: Replace with real API call when backend is ready
            // const data = await api.post('/auth/login', { email, password });
            
            // Using mock data for now
            const data = mockApiResponses.login(email, password);
            
            setAuthToken(data.token);
            setUser(data.user);
            setUserState(data.user);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        removeAuthToken();
        setUserState(null);
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isLoading,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
