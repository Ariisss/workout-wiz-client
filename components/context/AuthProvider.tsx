'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { fetchUser, loginUser, logoutUser, signupUser, updateUserProfile, setWorkoutPreferences } from '@/app/api/auth';
import { LoginCredentials } from '../auth/LoginForm';
import Cookies from 'js-cookie';
import { SignUpCredentials } from '../auth/SignupForm';
import { ProfileData } from '../auth/ProfileForm';
import { Preferences as WorkoutPrefsData } from '@/types/workout';

type userType = {
    user_id: number;
    username: string;
    email: string;
    password: string;
    sex: Boolean;
    date_of_birth: Date,
    height: number;
    weight: number;
    createdAt: Date;
    updatedAt: Date;
} | null

type AuthContextProps = {
    userData: userType
    loading: boolean
    login: (values: LoginCredentials) => Promise<void>
    logout: () => Promise<void>
    signup: (values: SignUpCredentials) => Promise<void>
    setProfile: (values: ProfileData) => Promise<void>
    setWorkoutPrefs: (values: WorkoutPrefsData) => Promise<void>

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
        if (Cookies.get('token') !== undefined) fetchUserData()
    }, []);

    // unauthenticated handler
    useEffect(() => {
        if (!loading && !userData && !publicRoutes.includes(pathname)) {
            router.push('/auth/login');
        }
    }, [userData, loading, pathname]);


    ///////////////////////
    //   AUTH HANDLING   //
    ///////////////////////
    const login = async (values: LoginCredentials) => {
        try {
            router.prefetch('/dashboard')
            await loginUser(values)

            await fetchUserData()
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser()
            Cookies.remove('token')
            setUserData(null)
            router.push('/auth/login')

        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    const signup = async (values: SignUpCredentials) => {
        try {
            await signupUser(values)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const setProfile = async (values: ProfileData) => {
        try {
            await updateUserProfile(values)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const setWorkoutPrefs = async (values: WorkoutPrefsData) => {
        try {
            await setWorkoutPreferences(values)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    ////////////////////////
    //   DATA RETRIEVAL   //
    ////////////////////////
    const fetchUserData = async () => {
        try {
            setLoading(true);
            const data: userType = await fetchUser()
            setUserData(data)
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    };

    return (
        <AuthContext.Provider value={{
            userData: userData,
            login,
            logout,
            signup,
            setProfile,
            setWorkoutPrefs,
            loading
        }}>
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
