"use client";

import useGetPosts, { Post } from "@/hooks/useGetPosts";

export default function Home() {
  const { query } = useGetPosts();
  const { data, isLoading, isError } = query;
  const classNameTh = "border border-gray-300 p-2"
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className={classNameTh}>User ID</th>
          <th className={classNameTh}>ID</th>
          <th className={classNameTh}>Title</th>
          <th className={classNameTh}>Body</th>
          <th className={classNameTh}>Status</th>
          <th className={classNameTh}>Top Rate</th>
        </tr>
      </thead>
      <tbody>
        {data?.posts.map((post: Post, index: number) => (
          <tr key={index}>
            <td className={classNameTh}>{post.userId}</td>
            <td className={classNameTh}>{post.id}</td>
            <td className={classNameTh}>{post.title}</td>
            <td className={classNameTh}>{post.body}</td>
            <td className={classNameTh}>{post.status}</td>
            <td className={classNameTh}>{post.topRate ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}