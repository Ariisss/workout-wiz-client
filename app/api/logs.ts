import { ExerciseLog, PlanExercise, WorkoutPlan } from '@/types/workout';
import { API } from './auth'

export const logExercise = async ({ plan_exercise_id }: { plan_exercise_id: number }) => {
    const response = await fetch(`${API}/exercise-logs`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(plan_exercise_id)
    })
    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message)
    }
    return response.json()
}

