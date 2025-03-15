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
//filter status
export type PostStatusType = "publish" | "draft" | "block" | "all";


export const log = (title: string) => {
    console.log("========== ==========")
    console.log(title)
    console.log("========== ==========")
}


log("test this is log and this is logo")