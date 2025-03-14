"use client";

import { useQuery } from "@tanstack/react-query"
import axios from "@/lib/axios";
import { Post, PostsResponse, PostStatusType } from "@/types";


const fetchPosts = async (status: PostStatusType): Promise<PostsResponse> => {
    if (status === "all") {
        const res = await axios.get("/posts");
        return res.data;
    } else {
        const res = await axios.get("/posts", { params: { status } });
        return res.data;
    }
}

export default function useGetPosts(status: PostStatusType) {
    const query = useQuery<PostsResponse>({ queryKey: ["posts", status], queryFn: () => fetchPosts(status), staleTime: 1000 * 60 * 5 });
    return {
        query
    }
}
