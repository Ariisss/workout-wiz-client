import { ExerciseLog, WorkoutPlan } from "@/types/workout"

// get workouts (count of workouts today, workout datas for today, count of workouts for eachday this week)
// get exercise logs (total logs, total logs compare to last week, calories burned(compare to last week), weekly streak, calories for last 5 workouts)

export const getWorkoutToday = (plan: WorkoutPlan, logs?: ExerciseLog[]) => {
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });

    const todaysExercises = plan.exercises.filter(exercise => 
        exercise.workout_day === dayOfWeek
    );

    if (todaysExercises.length === 0) {
        return null;
    }

    if (!logs) {
        return todaysExercises[0];
    }

    // Filter today's logs
    const todaysLogs = logs.filter(log => {
        const logDate = new Date(log.date);
        return logDate.toDateString() === today.toDateString();
    });

    // Find first exercise that hasn't been logged today
    const nextExercise = todaysExercises.find(exercise => 
        !todaysLogs.some(log => 
            log.plan_exercise_id === exercise.plan_exercise_id
        )
    );

    return nextExercise || null;
}


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

    // Usage:
    // const workoutCounts = countTotalWorkouts(exerciseLogs)
    // console.log(workoutCounts.total) 
    // console.log(workoutCounts.lastWeek) 
    
}


export const calculateCaloriesBurned = (data: ExerciseLog[]) => {
    const today = new Date()
    const lastWeekStart = new Date(today)
    lastWeekStart.setDate(today.getDate() - 7)

    return {
        total: data.reduce((sum, log) => sum + log.calories_burned, 0),
        lastWeek: data
            .filter(log => {
                const logDate = new Date(log.date)
                return logDate >= lastWeekStart && logDate <= today
            })
            .reduce((sum, log) => sum + log.calories_burned, 0)
    }

    // Usage:
    // const caloriesStats = calculateCaloriesBurned(exerciseLogs)
    // console.log(caloriesStats.total)
    // console.log(caloriesStats.lastWeek) 

}

export const calculateWeeklyStreak = (data: ExerciseLog[], plans: WorkoutPlan[]) => {
    // sorts desc order
    const sortedLogs = [...data].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let streak = 0;
    const processedWeeks = new Set<string>();

    // Group logs by week
    const logsByWeek = sortedLogs.reduce((acc, log) => {
        const logDate = new Date(log.date);
        const startOfWeek = new Date(logDate);
        startOfWeek.setDate(logDate.getDate() - logDate.getDay()); // Move to Sunday
        const weekStr = startOfWeek.toDateString();

        if (!acc[weekStr]) {
            acc[weekStr] = [];
        }
        acc[weekStr].push(log);
        return acc;
    }, {} as Record<string, ExerciseLog[]>);

    // Get the current week and move backward
    const today = new Date();
    let currentWeek = new Date(today);
    currentWeek.setDate(today.getDate() - today.getDay()); // Start of this week (Sunday)

    while (true) {
        const weekStr = currentWeek.toDateString();

        // if this week is checked or no logs this week, break
        if (processedWeeks.has(weekStr) || !logsByWeek[weekStr]) {
            break;
        }

        // Get logs for this week
        const weeklyLogs = logsByWeek[weekStr];

        // Check if all planned exercises for this week were completed
        const allExercisesCompleted = plans.every(plan => {
            return plan.exercises.every(exercise => {
                // Find all exercises scheduled for this week
                const scheduledDays = plan.exercises.filter(ex =>
                    // Check if the exercise's workout day falls within the current week
                    isWorkoutDayInWeek(ex.workout_day, currentWeek)
                );

                // Count exercises for the week
                const requiredExercises = scheduledDays.length;

                // Count exercises completed by the user for the week
                const completedExercises = weeklyLogs.filter(log =>
                    scheduledDays.some(ex => ex.plan_exercise_id === log.plan_exercise_id)
                ).length;

                return completedExercises >= requiredExercises;
            });
        });

        // If the user didn’t complete all exercises for the week, break streak
        if (!allExercisesCompleted) {
            break;
        }

        streak++;
        processedWeeks.add(weekStr);

        // Move to the previous week
        currentWeek.setDate(currentWeek.getDate() - 7);
    }

    return streak;
};

// checks if workout day is in the week
const isWorkoutDayInWeek = (workoutDay: string, weekStart: Date): boolean => {
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    });
    return weekDays.includes(workoutDay);
};
