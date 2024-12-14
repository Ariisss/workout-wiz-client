'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { fetchUser, loginUser, logoutUser, signupUser, updateUserProfile, setWorkoutPreferences } from '@/app/api/auth';
import { LoginCredentials } from '../auth/LoginForm';
import Cookies from 'js-cookie';
import { SignUpCredentials } from '../auth/SignupForm';
import { ProfileData } from '../auth/ProfileForm';
import { ExerciseLog, PlanExercise, WorkoutPlan, Preferences as WorkoutPrefsData } from '@/types/workout';
import { toast } from 'react-toastify';
import { getLogs, getPlans, getWorkouts } from '@/app/api/workouts';

type userType = {
    user_id: number;
    username: string;
    email: string;
    password: string;
    sex: Boolean;
    date_of_birth: Date,
    height: number;
    weight: number;
    weeklyStreak: number;
    createdAt: Date;
    updatedAt: Date;
} | null

type AuthContextProps = {
    userData: userType
    workouts: PlanExercise[]
    plans: WorkoutPlan[]
    logs: ExerciseLog[]
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
    const token = Cookies.get('token');
    const router = useRouter()
    const pathname = usePathname()
    const toastId = useRef<string | number | null>(null)

    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState<userType>(null)
    const [workouts, setWorkouts] = useState<PlanExercise[]>([])
    const [plans, setPlans] = useState<WorkoutPlan[]>([])
    const [logs, setLogs] = useState<ExerciseLog[]>([])
    
    // loading handler
    useEffect(() => {
        if (token !== undefined) {
            fetchUserData()
            fetchWorkoutData()
        }
    }, []);

    useEffect(() => {
        const isDataFetched = userData !== null && workouts !== null && plans !== null && logs !== null;
        setLoading(!isDataFetched);
    }, [userData, workouts, plans, logs]);

    // unauthenticated handler
    useEffect(() => {
        if (!token && !userData && !publicRoutes.includes(pathname)) {
            router.replace('/auth/login');
        }
    }, [userData, pathname]);


    ///////////////////////
    //   AUTH HANDLING   //
    ///////////////////////
    const login = async (values: LoginCredentials) => {
        try {
            router.prefetch('/dashboard')
            await loginUser(values)

            await fetchUserData()
            await fetchWorkoutData()
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
            await fetchUserData()
            router.push('/dashboard')
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
            const data: userType = await fetchUser()
            setUserData(data)
        } catch (error) {
            throw error
        } finally {
            if (toastId.current !== null) toast.done(toastId.current)
        }
    }

    const fetchWorkoutData = async () => {
        try {
            toastId.current = toast.loading("Fetching User Data...", {
                progressClassName: 'bg-[#66FFC7]'
            });
            const [workoutsRes, plansRes, logsRes] = await Promise.all([
                getWorkouts(),
                getPlans(),
                getLogs()
            ]);

            const workoutsData = workoutsRes?.data || [];
            const plansData = plansRes?.data || [];
            const logsData = logsRes?.data || [];

            setWorkouts(workoutsData);
            setPlans(plansData);
            setLogs(logsData);
        } catch (error) {
            console.error('Failed to fetch workout data:', error);
        } finally {
            if (toastId.current !== null) toast.done(toastId.current)
        }
    }

    return (
        <AuthContext.Provider value={{
            userData: userData,
            login,
            logout,
            signup,
            setProfile,
            setWorkoutPrefs,
            workouts,
            plans,
            logs,
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
