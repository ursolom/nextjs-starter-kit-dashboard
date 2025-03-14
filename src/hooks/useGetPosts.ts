"use client";

import { useQuery } from "@tanstack/react-query"
import axios from "@/lib/axios";

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    status: string;
    topRate: boolean;
}

interface PostsResponse {
    message: string;
    posts: Post[];
}

const fetchPosts = async (): Promise<PostsResponse> => {
    const res = await axios.get("/posts");
    return res.data;
}

export default function useGetPosts() {
    const query = useQuery<PostsResponse>({ queryKey: ["posts"], queryFn: fetchPosts, staleTime: 1000 * 60 * 5 }); // cache time 5 minutes
    return {
        query
    }
}
