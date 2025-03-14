"use client";

import useGetPosts from "@/hooks/useGetPosts";
import { Post, PostStatusType } from "@/types";
import { useState } from "react";

export default function Home() {
  const classNameTh = "border border-gray-300 p-2"
  const [status, setStatus] = useState<PostStatusType>("all");
  const { query } = useGetPosts(status);
  const { data, isLoading, isError } = query;
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <div className="p-4">
      <select name="status" onChange={(e) => setStatus(e.target.value as PostStatusType)} value={status} id="status" className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="all">All</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="block">Block</option>
      </select>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className={`${classNameTh} font-semibold text-gray-600`}>User ID</th>
              <th className={`${classNameTh} font-semibold text-gray-600`}>ID</th>
              <th className={`${classNameTh} font-semibold text-gray-600`}>Title</th>
              <th className={`${classNameTh} font-semibold text-gray-600`}>Body</th>
              <th className={`${classNameTh} font-semibold text-gray-600`}>Status</th>
              <th className={`${classNameTh} font-semibold text-gray-600`}>Top Rate</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data?.posts.map((post: Post, index: number) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className={classNameTh}>{post.userId}</td>
                <td className={classNameTh}>{post.id}</td>
                <td className={classNameTh}>{post.title}</td>
                <td className={classNameTh}>{post.body}</td>
                <td className={classNameTh}>
                  <span className={`px-2 py-1 rounded-full text-sm ${post.status === 'published' ? 'bg-green-100 text-green-800' :
                    post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                    {post.status}
                  </span>
                </td>
                <td className={classNameTh}>
                  <span className={`px-2 py-1 rounded-full text-sm ${post.topRate ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {post.topRate ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}