import { LoginCredentials } from '@/components/auth/LoginForm';
import { ProfileData } from '@/components/auth/ProfileForm';
import { SignUpCredentials } from '@/components/auth/SignupForm';
import { Preferences } from '@/types/workout';

const API_LINK = "http://localhost"
const PORT = 3001
export const API = `${API_LINK}:${PORT}`

export const loginUser = async (values: LoginCredentials) => {
    const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
    }

    return response.json()
}

export const logoutUser = async () => {
    const response = await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
    }

    return response.json()
};

export const fetchUser = async () => {
    const response = await fetch(`${API}/user`, {
        method: "GET",
        credentials: "include",
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
    }

    return response.json()
}



export const signupUser = async (values: SignUpCredentials) => {
    const response = await fetch(`${API}/auth/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
    }

    return response.json()
}

export const updateUserProfile = async (values: Partial<ProfileData>) => {
    const response = await fetch(`${API}/user`, {
        method: 'PUT',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
    }

    return response.json()
}

export const setWorkoutPreferences = async (values: Preferences) => {
    const response = await fetch(`${API}/work-preference`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
    }

    return response.json()
}

export const updateWorkoutPreferences = async (values: Partial<Preferences>) => {
    const response = await fetch(`${API}/work-preference`, {
        method: 'PUT',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
    }

    return response.json()
}

export const getWorkoutPreferences = async () => {
    const response = await fetch(`${API}/work-preference`, {
        method: 'GET',
        credentials: "include",
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
    }

    return response.json()
}

export const updateUserPassword = async (values: { oldPassword: string, newPassword: string }) => {
    const response = await fetch(`${API}/user/password`, {
        method: 'PUT',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
    }

    return response.json()
}