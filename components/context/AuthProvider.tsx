'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { formSchema as loginSchema } from '../auth/LoginForm';
import z from 'zod'
import Cookies from 'js-cookie';

type userType = {
    user_id: number;
    username: string;
    email: string;
    password: string;
    sex: Boolean;
    dob: Date,
    height: number;
    weight: number;
    createdAt: Date;
    updatedAt: Date;
} | null

type payloadType = {
    id: number,
    email: string,
}

type LoginCredentials = z.infer<typeof loginSchema>

type AuthContextProps = {
    userData: userType
    loading: boolean
    login: (values: LoginCredentials) => Promise<void>
    logout: () => Promise<void>
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined)
export const publicRoutes = ['/', '/auth/login', '/auth/signup']

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<userType>(null)


    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    // loading handler
    useEffect(() => {
        fetchUserData()
    }, []);

    // unauthenticated handler
    useEffect(() => {
        if (!loading && !userData && !publicRoutes.includes(pathname)) {
            router.push('/auth/login');
        }
    }, [userData, loading, pathname]);


    // login handler
    const login = async (values: LoginCredentials) => {
        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message);
            }

            const data: payloadType = (await response.json()).data.user;
            console.log(data)
            console.log(document.cookie)

            await fetchUserData()
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:3001/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message)
            }

            Cookies.remove('token')
            setUserData(null)
            router.push('/auth/login')

        } catch (error) {
            console.error('Error logging out:', error)
        }
    };

    ////////////////////////
    //   DATA RETRIEVAL   //
    ////////////////////////
    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3001/user/`, {
                method: 'GET',
                credentials: 'include',  // include cookies with the request
            })

            if (!response.ok) {
                const error = await response.json()
                console.error(error.message)
                throw new Error(error.message);
            }

            const data: userType = await response.json();
            setUserData(data); // Update the user data when it's loaded
            setLoading(false);
        } catch (error) {
            throw error
        } finally {
            setLoading(false); // Stop the loading indicator when done
        }
    };

    return (
        <AuthContext.Provider value={{ userData: userData, login, logout, loading }}>
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
