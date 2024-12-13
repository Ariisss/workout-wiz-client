import { ExerciseLog, WorkoutPlan, DailyExerciseCount, PlanExercise } from "@/types/workout"

// needed data:
// get workouts (count of workouts today, workout datas for today, count of workouts for eachday this week)
// get exercise logs (total logs, total logs compare to last week, calories burned(compare to last week), weekly streak, calories for last 5 workouts)

export const getRecentExercises = (logs: ExerciseLog[], plans: WorkoutPlan[]) => {
    if (!logs.length) return [];

    const sortedLogs = [...logs]
        .filter(log => log?.date)
        .sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .slice(0, 5);

    return sortedLogs.map(log => {
        const exercise = plans.reduce<PlanExercise | undefined>((found, plan) => {
            if (found) return found;
            return plan.planExercises?.find(ex =>
                ex.plan_exercise_id === log.plan_exercise_id
            );
        }, undefined);

        return {
            ...log,
            exercise_name: exercise?.exercise_name || 'Unknown Exercise'
        };
    });
};

export const getWeeklyCompletion = (dailyExercises: Array<{ day: string; completed: number; total: number }>) => {
    const activeDays = dailyExercises.filter(day => day.total > 0);

    const totalDays = activeDays.length;

    const completedDays = activeDays.filter(day =>
        day.completed >= day.total && day.total > 0
    ).length;

    return { completedDays, totalDays };
};

export const getCaloriesByWeek = (logs: ExerciseLog[]) => {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return weekDays.map(day => {
        const dayCalories = logs.reduce((sum, log) => {
            if (!log?.date) return sum;
            const logDate = new Date(log.date);
            const logDay = logDate.toLocaleDateString('en-US', { weekday: 'long' });

            if (logDay === day) {
                return sum + (log.calories_burned || 0);
            }
            return sum;
        }, 0);

        return {
            day: day,
            value: Math.round(dayCalories)
        };
    });
};

export const countDailyExercises = (plan: WorkoutPlan, logs: ExerciseLog[]) => {
    if (!plan?.planExercises) return [];

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    return weekDays.map(day => {
        const total = plan.planExercises.filter(ex =>
            ex?.workout_day === day
        ).length;

        const completed = logs.filter(log => {
            if (!log?.date) return false;
            const logDate = new Date(log.date);
            return logDate.toDateString() === new Date().toDateString() &&
                plan.planExercises.some(ex =>
                    ex?.plan_exercise_id === log?.plan_exercise_id &&
                    ex?.workout_day === day
                );
        }).length;

        return {
            day,
            completed,
            total
        };
    });
};


export const getWorkoutToday = (plans: WorkoutPlan[], logs?: ExerciseLog[]) => {
    if (!plans?.length) {
        return { planName: '', exercise: null, upcomingDay: '' };
    }

    const today = new Date();
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    console.log("Current day:", dayOfWeek);

    const todaysExercises = plans.reduce<PlanExercise[]>((exercises, plan) => {
        if (!Array.isArray(plan.planExercises)) {
            return exercises;
        }

        const planExercises = plan.planExercises.filter(exercise => {
            return exercise?.workout_day === dayOfWeek;
        });

        return [...exercises, ...planExercises];
    }, []);

    if (!todaysExercises.length) {
        console.log("No exercises found for today");
        const upcomingExercise = findUpcomingExercise(plans, today);
        return { planName: upcomingExercise.planName || '', exercise: upcomingExercise.exercise || null, upcomingDay: upcomingExercise.dayOfWeek || '' };
    }

    if (!logs?.length) {
        console.log("No logs found, returning first exercise");
        const plan = plans.find(p =>
            p.planExercises?.some(ex => ex.plan_exercise_id === todaysExercises[0].plan_exercise_id)
        );
        return {
            planName: plan?.plan_name || '',
            exercise: todaysExercises[0],
            upcomingDay: 'Today'
        };
    }

    const todaysLogs = logs.filter(log => {
        if (!log?.date) return false;
        const logDate = new Date(log.date);
        return logDate.toDateString() === today.toDateString();
    });

    const nextExercise = todaysExercises.find(exercise =>
        !todaysLogs.some(log =>
            log.plan_exercise_id === exercise.plan_exercise_id
        )
    );

    if (!nextExercise) {
        console.log("All exercises for today are already logged.");
        const upcomingExercise = findUpcomingExercise(plans, today);
        return { planName: upcomingExercise.planName || '', exercise: upcomingExercise.exercise || null, upcomingDay: 'Tomorrow' }; // Set to "Tomorrow" if no exercise for today
    }

    const plan = plans.find(p =>
        p.planExercises?.some(ex => ex.plan_exercise_id === nextExercise.plan_exercise_id)
    );

    return {
        planName: plan?.plan_name || '',
        exercise: nextExercise,
        upcomingDay: 'Today'
    };
};

// Helper function to find the next available exercise, considering the next week if necessary
const findUpcomingExercise = (plans: WorkoutPlan[], today: Date): { exercise: PlanExercise | null, planName: string | null, dayOfWeek: string } => {
    let upcomingDay: string = ''; // Add a default value here
    let nextExercise: PlanExercise | null = null;
    let planName: string | null = null;

    // Iterate through the next 7 days, looking for the next exercise
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i); // Move through the next 7 days
        upcomingDay = nextDay.toLocaleDateString('en-US', { weekday: 'long' });

        // Find an exercise for that specific day
        for (const plan of plans) {
            const exerciseForNextDay = plan.planExercises?.find(exercise => exercise.workout_day === upcomingDay);
            if (exerciseForNextDay) {
                nextExercise = exerciseForNextDay;
                planName = plan.plan_name;
                break; // Stop once we find the next available exercise
            }
        }

        if (nextExercise) break; // Break out of the loop if we find a valid exercise
    }

    // If no exercise is found in the next 7 days, look for the first exercise next week
    if (!nextExercise) {
        const firstDayOfNextWeek = new Date(today);
        firstDayOfNextWeek.setDate(today.getDate() + 7); // Set to the same day next week
        upcomingDay = firstDayOfNextWeek.toLocaleDateString('en-US', { weekday: 'long' });

        for (const plan of plans) {
            const exerciseForNextWeek = plan.planExercises?.find(exercise => exercise.workout_day === upcomingDay);
            if (exerciseForNextWeek) {
                nextExercise = exerciseForNextWeek;
                planName = plan.plan_name;
                break;
            }
        }
    }

    return { exercise: nextExercise, planName, dayOfWeek: upcomingDay };
};



export const countTotalWorkouts = (data: ExerciseLog[]) => {

    if (!data.length) return { total: 0, lastWeek: 0 };

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

    if (!data.length) return { total: 0, lastWeek: 0 };

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

// Partial rani, this i s so hard wtf
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
            return plan.planExercises.every(exercise => {
                // Find all exercises scheduled for this week
                const scheduledDays = plan.planExercises.filter(ex =>
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
