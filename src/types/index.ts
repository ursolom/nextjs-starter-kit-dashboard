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