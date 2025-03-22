import { type Role } from "@prisma/client";
import { type JWTPayload } from "jose";

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    status: "published" | "draft" | "block";
    topRate: boolean;
}

export interface PostsResponse {
    message: string;
    posts: Post[];
}
export type PostStatusType = "publish" | "draft" | "block" | "all";

export type ValidationErrors = Record<string, string[]> | undefined;

export type TState = {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
};

export type SessionResponse =
    | {
        success: true;
        userId: string;
        role: Role;
        expires: Date;
    }
    | {
        success: false;
        status: number;
        message: string;
    };

export type SessionPayload = {
    userId: string;
    expires: Date;
    role: Role
};

export type RefreshTokenPayload = JWTPayload & SessionPayload;

export interface CookieConfig {
    name: string;
    options: {
        httpOnly: boolean;
        secure: boolean;
        sameSite: "lax" | "strict" | "none";
        path: string;
    };
    duration: number;
}

