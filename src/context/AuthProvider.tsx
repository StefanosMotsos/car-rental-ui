import type {UserLoginDTO, UserPayload} from "../schemas/auth.ts";
import {jwtDecode} from "jwt-decode";
import {createContext, useContext, useState} from "react";
import {deleteCookie, getCookie, setCookie} from "../utils/cookies.ts";
import {login} from "../api/auth.ts";

type AuthUser = {
    userId: string
    username: string
    email: string
    role: string
    userUuid: string
    token: string
}

type AuthContextProps = {
    isAuthenticated: boolean
    user: AuthUser | null
    loginUser: (fields: UserLoginDTO) => Promise<void>
    logout: () => void
}

function decodeToken(token: string | null): AuthUser | null {
    if (!token) return null
    try {
        const payload = jwtDecode<UserPayload>(token)
        if (payload.exp * 1000 < Date.now()) return null
        return {
            userId: payload.nameid,
            username: payload.unique_name,
            email: payload.email,
            role: payload.role,
            userUuid: payload.uuid,
            token: token,
        }
    } catch {
        return null
    }
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<AuthUser | null>(
        () => decodeToken(getCookie("access_token") ?? null)
    )

    const loginUser = async (fields: UserLoginDTO) => {
        const res = await login(fields)
        setCookie("access_token", res.token, {
            expires: 1,
            SameSite: "Lax",
            secure: false,
            path: "/",
        })
        const decodedUser = decodeToken(res.token)
        setUser(decodedUser)
    }

    const logout = () => {
        deleteCookie("access_token")
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                loginUser,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}