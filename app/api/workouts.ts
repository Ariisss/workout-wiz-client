import { ExerciseLog, PlanExercise, WorkoutPlan } from '@/types/workout';
import { API } from './auth'

// get workouts (count of workouts today, workout datas for today, count of workouts for eachday this week)
// get exercise logs (total logs, total logs compare to last week, calories burned(compare to last week), weekly streak, calories for last 5 workouts)

interface ApiResponse<T> {
    data: T[];
    error?: string;
}


export const switchWorkoutPlan = async (planId: number) => {
    const response = await fetch(`${API}/workout-plan/switch/${planId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId: planId }),
    })

    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message)
    }

    return response.json()
}

export const generateWorkout = async () => {

    const response = await fetch(`${API}/workout-plan/generate/preferences`, {
        method: 'POST',
        credentials: 'include'
    })

    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message)
    }

    return response.json();
}

export const getWorkouts = async (): Promise<ApiResponse<PlanExercise>> => {

    const response = await fetch(`${API}/exercises`, {
        method: 'GET',
        credentials: 'include'
    })

    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message)
    }

    return response.json() as Promise<ApiResponse<PlanExercise>>;
}

export const getPlans = async (): Promise<ApiResponse<WorkoutPlan>> => {

    const response = await fetch(`${API}/workout-plan`, {
        method: 'GET',
        credentials: 'include'
    })

    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message)
    }

    return response.json()
}

export const getLogs = async (): Promise<ApiResponse<ExerciseLog>> => {

    const response = await fetch(`${API}/exercise-logs`, {
        method: 'GET',
        credentials: 'include'
    })

    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message)
    }

    return response.json()

}
