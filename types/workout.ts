export type GoalTypes =
    | "Muscle Gain"
    | "Weight Loss"
    | "Endurance"
    | "Flexibility"
    | "Balance"

export type IntensityLevels =
    "Beginner" |
    "Intermediate" |
    "Advanced"

export interface DailyExerciseCount {
    completed: number;
    total: number;
}

export interface PeriodComparison {
    current: number;
    previous: number;
}

export interface ExerciseLog {
    log_id: number;
    user_id: number;
    plan_exercise_id: number;
    date: string;
    duration_mins: number;
    calories_burned: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ExerciseLogWithName extends ExerciseLog {
    exercise_name: string;
}

export interface DashboardData {
    recentExercises: ExerciseLogWithName[];
    workoutStats: { total: number; lastWeek: number };
    caloriesStats: { total: number; lastWeek: number };
    dailyExercises: Array<{ day: string; completed: number; total: number }>;
    todaysWorkout: { planName: string; exercise: PlanExercise | null, upcomingDay: string; };
    weeklyCalories: Array<{ day: string; value: number }>
}

export interface LogData {
    past: ExerciseLogWithName[];
    current: PlanExercise[];
    missed: PlanExercise[];
}

export interface StatSum {
    totalWorkouts: string,
    totalCalories: string,
    totalDuration: number
}

export interface WeeklyData {
    weeklyCalories: Array<{ day: string, value: number }>,
    weeklyDurations: Array<{ day: string, value: number }>
}

export interface Highlights {
    calories: number,
    duration: number,
    consistency: number
}

export interface WeeklyComparison {
    calories: { val: number, inc: number },
    workouts: { val: number, inc: number },
    exercises: { val: number, inc: number },
    duration: { val: number, inc: number }
}
// export interface LogTypes extends Omit<ExerciseLog, 'log_id' | ''>

export interface PlanExercise {
    plan_exercise_id: number;
    plan_id: number;
    exercise_name: string;
    description: string;
    duration_mins: number;
    workout_day: string;
    sets: number;
    reps: number;
    met_value: number;
    createdAt?: string;
    updatedAt?: string;
}

// export interface WorkoutType extends Omit<PlanExercise, 'plan_exercise_id' | 'createdAt' | 'updatedAt'> {}

export interface User {
    user_id: number;
    username: string | null;
    email: string;
    password: string;
    sex: boolean | null;
    date_of_birth: string | null;
    weight: number | null;
    height: number | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface WorkoutPlan {
    plan_id: number;
    user_id: number;
    plan_name: string;
    description: string;
    goal: GoalTypes;
    duration_weeks: number;
    intensity: IntensityLevels;
    is_active: boolean;
    createdAt?: string;
    updatedAt?: string;
    // Relation to PlanExercise
    planExercises: PlanExercise[];
}

export interface Preferences {
    goal_type: string;
    with_gym: boolean;
    workout_days: string;
    intensity: IntensityLevels;
}

export interface PreferencesForm {
    with_gym: boolean;
    workout_days: string[];
    intensity: IntensityLevels;
}
