import { ExerciseLog, WorkoutPlan, DailyExerciseCount, PlanExercise, WeeklyComparison } from "@/types/workout"

// needed data:
// get workouts (count of workouts today, workout datas for today, count of workouts for eachday this week)
// get exercise logs (total logs, total logs compare to last week, calories burned(compare to last week), weekly streak, calories for last 5 workouts)

export const getRecentExercises = (logs: ExerciseLog[], plans: WorkoutPlan[], limit: number = 5) => {
    if (!logs.length) return [];

    // Ensure logs are sorted by date in descending order, while handling missing or invalid dates
    const sortedLogs = [...logs]
        .filter(log => log?.date && !isNaN(new Date(log.date).getTime())) // Ensure valid date
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by most recent
        .slice(0, limit); // Limit the results to the most recent 'limit' entries

    return sortedLogs.map(log => {
        console.log('Processing log:', log); // Debug log to check if `plan_exercise_id` and `date` are valid
    
        const exercise = plans.reduce<PlanExercise | undefined>((found, plan) => {
            if (found) return found;
            return plan.planExercises?.find(ex =>
                ex.plan_exercise_id === log.plan_exercise_id
            );
        }, undefined);
    
        console.log('Found exercise:', exercise); // Debug the found exercise object
    
        const exerciseName = exercise?.exercise_name || 'Unknown Exercise';
        console.log('Exercise name:', exerciseName); // Debug the exercise name being assigned
    
        return {
            ...log,
            // exercise_name: exerciseName,  // Ensure exercise_name is present
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

export const countDailyExercises = (plans: WorkoutPlan[], logs: ExerciseLog[]) => {
    const activePlan = plans.find(p => p.is_active);
    if (!activePlan?.planExercises) return [];

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return weekDays.map(day => {
        const total = activePlan.planExercises.filter(ex =>
            ex?.workout_day === day
        ).length;

        const completed = logs.filter(log => {
            if (!log?.date) return false;
            const logDate = new Date(log.date);
            return logDate.toDateString() === new Date().toDateString() &&
                activePlan.planExercises.some(ex =>
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

    const activePlan = plans.find(p => p.is_active);

    if (!activePlan) {
        return { planName: '', exercise: null, upcomingDay: '' };
    }

    const today = new Date();
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    console.log("Current day:", dayOfWeek);

    const todaysExercises = activePlan.planExercises?.filter(exercise => {
        return exercise?.workout_day === dayOfWeek;
    }) || [];

    if (!todaysExercises.length) {
        console.log("No exercises found for today");
        const upcomingExercise = findUpcomingExercise([activePlan], today);
        return { 
            planName: upcomingExercise.planName || '', 
            exercise: upcomingExercise.exercise || null, 
            upcomingDay: upcomingExercise.dayOfWeek || '' 
        };
    }

    if (!logs?.length) {
        console.log("No logs found, returning first exercise");
        return {
            planName: activePlan?.plan_name || '',
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
        const upcomingExercise = findUpcomingExercise([activePlan], today);
        return { 
            planName: upcomingExercise.planName || '', 
            exercise: upcomingExercise.exercise || null, 
            upcomingDay: 'Tomorrow' 
        };
    }

    return {
        planName: activePlan?.plan_name || '',
        exercise: nextExercise,
        upcomingDay: 'Today'
    };
};

// Helper function to find the next available exercise, considering the next week if necessary
const findUpcomingExercise = (
    plans: WorkoutPlan[],
    today: Date
): { exercise: PlanExercise | null; planName: string | null; dayOfWeek: string } => {
    let upcomingDay = '';
    let nextExercise: PlanExercise | null = null;
    let planName: string | null = null;

    // Identify the active plan if it exists
    const activePlan = plans.find(p => p.is_active);

    // Determine which set of plans to iterate over. If there's an active plan, we only look at that one.
    const plansToCheck = activePlan ? [activePlan] : plans;

    // Iterate through the next 7 days, looking for the next exercise
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        upcomingDay = nextDay.toLocaleDateString('en-US', { weekday: 'long' });

        // Check the determined set of plans (either the single active plan or all provided plans)
        for (const plan of plansToCheck) {
            const exerciseForNextDay = plan.planExercises?.find(exercise => exercise.workout_day === upcomingDay);
            if (exerciseForNextDay) {
                nextExercise = exerciseForNextDay;
                planName = plan.plan_name;
                break; // Found an exercise for a day, so stop searching
            }
        }

        if (nextExercise) break;
    }

    // If no exercise is found in the upcoming 7 days, look at the same weekday next week
    if (!nextExercise) {
        const firstDayOfNextWeek = new Date(today);
        firstDayOfNextWeek.setDate(today.getDate() + 7);
        upcomingDay = firstDayOfNextWeek.toLocaleDateString('en-US', { weekday: 'long' });

        for (const plan of plansToCheck) {
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


// PLANS PAGE
export const getActiveWorkoutPlan = (plans: WorkoutPlan[]): WorkoutPlan | null => {
    return plans.find(plan => plan.is_active === true) ?? null;
}

// LOGS PAGE
export const getUnfinishedExercisesToday = (plans: WorkoutPlan[], logs: ExerciseLog[]): PlanExercise[] => {
    const today = new Date();
    const todayLogs = logs.filter(log => {
        const logDate = new Date(log.date);
        return logDate.toDateString() === today.toDateString();
    });
    const activePlan = getActiveWorkoutPlan(plans);
    if (!activePlan) return [];

    const todayWorkoutDays = activePlan.planExercises.filter(exercise => exercise.workout_day === today.toLocaleDateString('en-US', { weekday: 'long' }));
    const completedExerciseIds = todayLogs.map(log => log.plan_exercise_id);

    return todayWorkoutDays.filter(exercise => !completedExerciseIds.includes(exercise.plan_exercise_id));
};

export const getMissedExercisesThisWeek = (plans: WorkoutPlan[], logs: ExerciseLog[]): PlanExercise[] => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const weeklyLogs = logs.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= lastWeek && logDate <= today && logDate.getDay() === today.getDay();
    });
    const activePlan = getActiveWorkoutPlan(plans);
    if (!activePlan) return [];

    const completedExerciseIds = weeklyLogs.map(log => log.plan_exercise_id);

    const weeklyExercises = activePlan.planExercises.filter(exercise => 
        isWorkoutDayInWeek(exercise.workout_day, lastWeek) && 
        exercise.workout_day !== today.toLocaleDateString('en-US', { weekday: 'long' })
    );

    return weeklyExercises.filter(exercise => !completedExerciseIds.includes(exercise.plan_exercise_id));
};

// PROGRESS PAGE
export const countAllWorkouts = (logs: ExerciseLog[]): number => logs.length;

export const calculateAllCaloriesBurned = (logs: ExerciseLog[]): number =>
    logs.reduce((total, log) => total + log.calories_burned, 0);

export const countTotalDuration = (logs: ExerciseLog[], exercises: PlanExercise[]): number =>
    logs.reduce((total, log) => {
        const exercise = exercises.find(ex => ex.plan_exercise_id === log.plan_exercise_id);
        return total + (exercise?.duration_mins || 0);
    }, 0);

export const getAllExercisesFromPlans = (plans: WorkoutPlan[]): PlanExercise[] => {
    return plans.reduce<PlanExercise[]>((allExercises, plan) => {
        return [...allExercises, ...plan.planExercises];
    }, []);
};

export const getPastMonthWeeklyCalories = (logs: ExerciseLog[]): Array<{ day: string, value: number }> => {
    const today = new Date();
    const startOfMonth = new Date(today);
    startOfMonth.setDate(1);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(endOfMonth.getDate() - 1);

    const logsInMonth = logs.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= startOfMonth && logDate <= endOfMonth;
    });

    const weeksInMonth = Array.from({ length: 4 }).map((_, i) => {
        const weekStart = new Date(startOfMonth);
        weekStart.setDate(startOfMonth.getDate() + (i * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return {
            weekStart,
            weekEnd,
        };
    });

    const weeklyCalories = weeksInMonth.map(({ weekStart, weekEnd }, index) => {
        const weekLogs = logsInMonth.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= weekStart && logDate <= weekEnd;
        });
        const weekCalories = weekLogs.reduce((sum, log) => sum + log.calories_burned, 0);
        return {
            day: `${index + 1}`,
            value: weekCalories,
        };
    });

    return weeklyCalories;
};

export const getPastMonthWeeklyDurations = (logs: ExerciseLog[], exercises: PlanExercise[]): Array<{ day: string, value: number }> => {
    const today = new Date();
    const startOfMonth = new Date(today);
    startOfMonth.setDate(1);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(endOfMonth.getDate() - 1);

    const logsInMonth = logs.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= startOfMonth && logDate <= endOfMonth;
    });

    const weeksInMonth = Array.from({ length: 4 }).map((_, i) => {
        const weekStart = new Date(startOfMonth);
        weekStart.setDate(startOfMonth.getDate() + (i * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return {
            weekStart,
            weekEnd,
        };
    });

    const weeklyDurations = weeksInMonth.map(({ weekStart, weekEnd }, index) => {
        const weekLogs = logsInMonth.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= weekStart && logDate <= weekEnd;
        });
        const weekDuration = weekLogs.reduce((sum, log) => {
            const exercise = exercises.find(ex => ex.plan_exercise_id === log.plan_exercise_id);
            return sum + (exercise?.duration_mins || 0);
        }, 0);
        return {
            day: `${index + 1}`,
            value: weekDuration,
        };
    });

    return weeklyDurations;
};

export const getMostCaloriesBurnedInAWeek = (logs: ExerciseLog[]): number => {
    const weeksInYear = Array.from({ length: 52 }).map((_, i) => {
        const weekStart = new Date(new Date().getFullYear(), 0, 1 + (i * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return {
            weekStart,
            weekEnd,
        };
    });

    const weeklyCalories = weeksInYear.map(({ weekStart, weekEnd }) => {
        const weekLogs = logs.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= weekStart && logDate <= weekEnd;
        });
        return weekLogs.reduce((sum, log) => sum + log.calories_burned, 0);
    });

    return Math.max(...weeklyCalories);
};

export const getMostDurationInAWeek = (logs: ExerciseLog[], exercises: PlanExercise[]): number => {
    const weeksInYear = Array.from({ length: 52 }).map((_, i) => {
        const weekStart = new Date(new Date().getFullYear(), 0, 1 + (i * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return {
            weekStart,
            weekEnd,
        };
    });

    const weeklyDurations = weeksInYear.map(({ weekStart, weekEnd }) => {
        const weekLogs = logs.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= weekStart && logDate <= weekEnd;
        });
        return weekLogs.reduce((sum, log) => {
            const exercise = exercises.find(ex => ex.plan_exercise_id === log.plan_exercise_id);
            return sum + (exercise?.duration_mins || 0);
        }, 0);
    });

    return Math.max(...weeklyDurations);
};

export const getMostWorkoutsInAWeek = (logs: ExerciseLog[]): number => {
    const weeksInYear = Array.from({ length: 52 }).map((_, i) => {
        const weekStart = new Date(new Date().getFullYear(), 0, 1 + (i * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return {
            weekStart,
            weekEnd,
        };
    });

    const weeklyWorkouts = weeksInYear.map(({ weekStart, weekEnd }) => {
        const weekLogs = logs.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= weekStart && logDate <= weekEnd;
        });
        return weekLogs.length;
    });

    return Math.max(...weeklyWorkouts);
};


const getSundayOfLastWeek = () => {
    const today = new Date();
    const lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
    lastSunday.setDate(lastSunday.getDate() - 7);
    return lastSunday;
};

const getSaturdayOfLastWeek = () => {
    const lastSunday = getSundayOfLastWeek();
    const lastSaturday = new Date(lastSunday);
    lastSaturday.setDate(lastSaturday.getDate() + 6);
    return lastSaturday;
};

export const getWeeklyComparison = (logs: ExerciseLog[], exercises: PlanExercise[]): WeeklyComparison => {
    const lastSunday = getSundayOfLastWeek();
    const lastSaturday = getSaturdayOfLastWeek();

    const lastWeekLogs = logs.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= lastSunday && logDate <= lastSaturday;
    });

    const thisWeekLogs = logs.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= lastSaturday && logDate <= new Date();
    });

    const lastWeekWorkouts = countTotalWorkouts(lastWeekLogs);
    const thisWeekWorkouts = countTotalWorkouts(thisWeekLogs);

    const lastWeekCalories = calculateCaloriesBurned(lastWeekLogs);
    const thisWeekCalories = calculateCaloriesBurned(thisWeekLogs);

    const lastWeekDurations = countTotalDuration(lastWeekLogs, exercises);
    const thisWeekDurations = countTotalDuration(thisWeekLogs, exercises);

    const lastWeekExercises = Array.from(new Set(lastWeekLogs.map(log => log.plan_exercise_id))).map(id => exercises.find(ex => ex.plan_exercise_id === id)).filter(ex => ex) as PlanExercise[];
    const thisWeekExercises = Array.from(new Set(thisWeekLogs.map(log => log.plan_exercise_id))).map(id => exercises.find(ex => ex.plan_exercise_id === id)).filter(ex => ex) as PlanExercise[];

    return {
        calories: {
            val: thisWeekCalories.total,
            inc: (thisWeekCalories.total - lastWeekCalories.total) / (lastWeekCalories.total || 1) * 100,
        },
        workouts: {
            val: thisWeekWorkouts.total,
            inc: (thisWeekWorkouts.total - lastWeekWorkouts.total) / (lastWeekWorkouts.total || 1) * 100,
        },
        exercises: {
            val: thisWeekExercises.length,
            inc: (thisWeekExercises.length - lastWeekExercises.length) / (lastWeekExercises.length || 1) * 100,
        },
        duration: {
            val: thisWeekDurations,
            inc: (thisWeekDurations - lastWeekDurations) / (lastWeekDurations || 1) * 100,
        },
    };
};

// SETTINGS
export const convertBinaryDaysToWeekdays = (binaryDays: string): string[] => {
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    return binaryDays.split('').map((char, index) => char === '1' ? 
    daysOfWeek[index] : null).filter(day => day !== null) as string[];
};
