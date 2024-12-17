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
import { generateWorkout, getLogs, getPlans, getWorkouts } from '@/app/api/workouts';
import ToastError from "@/components/general/ToastError";
import ToastProgress from '../general/ToastProgress';


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
    workoutGenerating: boolean
    login: (values: LoginCredentials) => Promise<void>
    logout: () => Promise<void>
    signup: (values: SignUpCredentials) => Promise<void>
    setProfile: (values: ProfileData) => Promise<void>
    setWorkoutPrefs: (values: WorkoutPrefsData) => Promise<void>
    refreshPlans: () => Promise<void>
    updateProfile: (values: Partial<ProfileData>) => Promise<void>
    updateWorkoutPrefs: (values: Partial<WorkoutPrefsData>) => Promise<void>
    updatePassword: (values: { oldPassword: string, newPassword: string }) => Promise<void>
    refreshLogs: () => Promise<void>
    handleGenerateWorkout: () => Promise<void>
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined)
export const publicRoutes = ['/', '/auth/login', '/auth/signup']

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const token = Cookies.get('token');
    const router = useRouter()
    const pathname = usePathname()
    const toastId = useRef<string | number | null>(null)
    const genToastId = useRef<string | number | null>(null)
    const isPageUnloading = useRef(false);

    const [workoutGenerating, setWorkoutGenerating] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState<userType>(null)
    const [prefs, setUserPrefs] = useState<WorkoutPrefsData | null>(null)
    const [workouts, setWorkouts] = useState<PlanExercise[]>([])
    const [plans, setPlans] = useState<WorkoutPlan[]>([])
    const [logs, setLogs] = useState<ExerciseLog[]>([])

    // loading handler
    useEffect(() => {
        if (token !== undefined) { // assumes refreshed state
            fetchAll()
            handleGenerateOnRefresh()
        }

        const handleBeforeUnload = () => {
            isPageUnloading.current = true;
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
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


    const toastLoadingContent = (
        <ToastProgress title='Generating Workout' desc={'This make take a bit...'} />
    )
    useEffect(() => {
        if (workoutGenerating) {
            genToastId.current = toast.loading(toastLoadingContent, {
                progressClassName: 'bg-[#66FFC7]',
                className: 'color-primary-light',
            });
        } else if (!workoutGenerating && genToastId.current !== null) {
            toast.dismiss(genToastId.current);
        }
    }, [workoutGenerating]);


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
        setWorkoutGenerating(sessionStorage.getItem("generatingWorkout") === "true")
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

            setUserPrefs(prefsData)
        } catch (error) {
            console.error('Failed to fetch workout preferences:', error);
        } finally {
            if (toastId.current !== null) toast.done(toastId.current)
        }
    }

    const refreshPlans = async () => {
        try {
            setLoading(true)
            const plansRes = await getPlans()
            const plansData = plansRes?.data || []
            setPlans(plansData)
        } catch (error) {
            console.error("Failed to refresh plans:", error)
            toast.error("Error refreshing workout plans. Please try again.")
        } finally {
            setLoading(false)
        }
    };

    const refreshLogs = async () => {
        try {
            setLoading(true)
            const logsRes = await getLogs()
            const logsData = logsRes?.data || []
            setLogs(logsData)
        } catch (error) {
            console.error("Failed to refresh logs:", error)
            toast.error("Error refreshing logs. Please try again.")
        } finally {
            setLoading(false)
        }
    };

    const handleGenerateWorkout = async () => {
        try {
            setWorkoutGenerating(true)
            sessionStorage.setItem("generatingWorkout", "true");
            sessionStorage.setItem("generatingWorkoutDate", new Date().toISOString());

            console.log(sessionStorage.getItem("generatingWorkout"))
            await generateWorkout();
            await refreshPlans();
        } catch (error) {
            toast.error(<ToastError title="Workout Generation Error" desc={error} />);
        } finally {
            if (!isPageUnloading.current) {
                console.log("YEAH REMOVED");
                sessionStorage.removeItem("generatingWorkout");
                setWorkoutGenerating(false);
            }
        }
    };

    const handleGenerateOnRefresh = async () => {
        console.log(sessionStorage.getItem("generatingWorkout"))
        if (sessionStorage.getItem("generatingWorkout") === "true") {
            const timeSecs = 90; // max limit of workout generation (1 min 30 secs)
            const genDate = sessionStorage.getItem("generatingWorkoutDate");
            const doneGenerating = () => {
                sessionStorage.removeItem("generatingWorkout");
                sessionStorage.removeItem("generatingWorkoutDate");
                setWorkoutGenerating(false);
            }

            if (genDate) {
                const diff = (new Date().getTime() - new Date(genDate).getTime()) / 1000;

                if (diff < timeSecs) {
                    setTimeout(() => {
                        doneGenerating()
                    }, (timeSecs - diff) * 1000);

                } else {
                    doneGenerating()
                }
            } else {
                doneGenerating()
            }
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
            updateProfile,
            updateWorkoutPrefs,
            updatePassword,
            workouts,
            plans,
            prefs,
            logs,
            loading,
            workoutGenerating: workoutGenerating,
            refreshPlans,
            refreshLogs,
            handleGenerateWorkout
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
