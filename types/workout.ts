export enum GoalTypes {
    MUSCLE_BUILDING = "muscle_building",
    WEIGHT_LOSS = "weight_loss",
    MAINTENANCE = "maintenance"
}

export enum IntensityLevels {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced"
}

export interface DailyExerciseCount {
    completed: number;
    total: number;
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
    exercises: PlanExercise[];
}

export interface Preferences {
    preference_id: number;
    user_id: number;
    goal_type: GoalTypes;
    with_gym: boolean;
    workout_days: string;
    intensity: IntensityLevels;
    createdAt?: string;
    updatedAt?: string;
}