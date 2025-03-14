"use client";

import { useQuery } from "@tanstack/react-query"
import axios from "@/lib/axios";
import { Post, PostsResponse } from "@/types";


const fetchPosts = async (): Promise<PostsResponse> => {
    const res = await axios.get("/posts");
    return res.data;
}

export default function useGetPosts() {
    const query = useQuery<PostsResponse>({ queryKey: ["posts"], queryFn: fetchPosts, staleTime: 1000 * 60 * 5 });
    return {
        query
    }
}
