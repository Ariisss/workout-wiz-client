import { API } from './auth'

// get workouts (count of workouts today, workout datas for today, count of workouts for eachday this week)
// get exercise logs (total logs, total logs compare to last week, calories burned(compare to last week), weekly streak, calories for last 5 workouts)

export const getWorkouts = async () => {

    const response = await fetch(`${API}/exercises`, {
        method: 'GET',
        credentials: 'include'
    })

    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message)
    }

    return response.json()
}

export const getPlans = async () => {

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

export const getLogs = async () => {

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
