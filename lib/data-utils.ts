import { ExerciseLog } from "@/types/workout"

export const countTotalWorkouts = (data: ExerciseLog[]) => {
    const today = new Date()
    const lastWeekStart = new Date(today)
    lastWeekStart.setDate(today.getDate() - 7)

    return {
        total: data.length,
        lastWeek: data.filter(log => {
            const logDate = new Date(log.date)
            return logDate >= lastWeekStart && logDate <= today
        }).length
    }

}