'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextProps = {
    user: {
        name: string
    } | null
    loading: boolean
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)
export const publicRoutes = ['/auth/login', '/auth/signup']

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthContextProps['user']>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    // loading handler
    useEffect(() => {
        // token handling
        setLoading(false);
    }, []);

    // unauthenticated handler
    useEffect(() => {
        if (!loading && !user && !publicRoutes.includes(pathname)) {
            router.push('/auth/login');
        }
    }, [user, loading, pathname]);

    // login handler
    const login = (token: string) => {
        // token handling
        setUser({ name: token })
        router.push('/dashboard');
    };

    const logout = () => {
        // token handling
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// context hook
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context
}
