import { formSchema as loginSchema } from '@/components/auth/LoginForm';
import z from 'zod'

const API_LINK = "http://localhost"
const PORT = 3001
const API = `${API_LINK}:${PORT}`

export type LoginCredentials = z.infer<typeof loginSchema>

export const loginUser = async (values: LoginCredentials) => {
    const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}

export const logoutUser = async () => {
    const response = await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
};

export const fetchUser = async () => {
    const response = await fetch(`${API}/user`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
};