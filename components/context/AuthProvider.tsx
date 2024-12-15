'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { fetchUser, loginUser, logoutUser, signupUser, updateUserProfile, setWorkoutPreferences, getWorkoutPreferences, updateWorkoutPreferences, updateUserPassword } from '@/app/api/auth';
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
    prefs: WorkoutPrefsData | null
    workouts: PlanExercise[]
    plans: WorkoutPlan[]
    logs: ExerciseLog[]
    loading: boolean
    login: (values: LoginCredentials) => Promise<void>
    logout: () => Promise<void>
    signup: (values: SignUpCredentials) => Promise<void>
    setProfile: (values: ProfileData) => Promise<void>
    setWorkoutPrefs: (values: WorkoutPrefsData) => Promise<void>
    refreshPlans: () => Promise<void>
    updateProfile: (values: Partial<ProfileData>) => Promise<void>
    updateWorkoutPrefs: (values: Partial<WorkoutPrefsData>) => Promise<void>
    updatePassword: (values: { oldPassword: string, newPassword: string }) => Promise<void>

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
    const [prefs, setUserPrefs] = useState<WorkoutPrefsData | null>(null)
    const [workouts, setWorkouts] = useState<PlanExercise[]>([])
    const [plans, setPlans] = useState<WorkoutPlan[]>([])
    const [logs, setLogs] = useState<ExerciseLog[]>([])

    // loading handler
    useEffect(() => {
        if (token !== undefined) {
            fetchAll()
        }
    }, []);

    useEffect(() => {
        const isDataFetched = userData !== null && workouts !== null && plans !== null && logs !== null;
        setLoading(!isDataFetched);
    }, [userData, workouts, plans, logs, prefs]);

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

            await fetchAll()
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
            await fetchAll()
            router.push('/dashboard')
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const updateProfile = async (values: Partial<ProfileData>) => {
        try {
            await updateUserProfile(values)
            await fetchUserData()
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const updateWorkoutPrefs = async (values: Partial<WorkoutPrefsData>) => {
        try {
            await updateWorkoutPreferences(values)
            await fetchUserPrefs()
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const updatePassword = async (values: { oldPassword: string, newPassword: string }) => {
        try {
            await updateUserPassword(values)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    ////////////////////////
    //   DATA RETRIEVAL   //
    ////////////////////////
    const fetchAll = async () => {
        toastId.current = toast.loading("Fetching User Data...", {
            progressClassName: 'bg-[#66FFC7]'
        });
        await fetchUserData()
        await fetchWorkoutData()
        await fetchUserPrefs()
        if (toastId.current !== null) toast.done(toastId.current)
    }
    const fetchUserData = async () => {
        try {
            const data: userType = await fetchUser()
            setUserData(data)
        } catch (error) {
            throw error
        }
    }

    const fetchWorkoutData = async () => {
        try {
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
        }
    }

    const fetchUserPrefs = async () => {
        try {
            const prefsRes = await getWorkoutPreferences()
            const prefsData = prefsRes?.data[0] || null
            // console.log(prefsData)
            setUserPrefs(prefsData)
        } catch (error) {
            console.error('Failed to fetch workout preferences:', error);
        } finally {
            if (toastId.current !== null) toast.done(toastId.current)
        }
    }

    const refreshPlans = async () => {
        const plansRes = await getPlans();
        const plansData = plansRes?.data || [];
        const updatedPlans = [...plans, ...plansData];
        setPlans(updatedPlans);
    };

    return (
        <AuthContext.Provider value={{
            userData: userData,
            login,
            logout,
            signup,
            setProfile,
            setWorkoutPrefs,
            updateProfile,
            updateWorkoutPrefs,
            updatePassword,
            workouts,
            plans,
            prefs,
            logs,
            loading,
            refreshPlans
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
