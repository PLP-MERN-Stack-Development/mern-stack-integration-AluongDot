import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!post) return <div className="text-center mt-10 text-red-500">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      {post.image && (
        <img
          src={post.image.startsWith('http') 
            ? post.image 
            : `${import.meta.env.VITE_API_URL}${post.image}`}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-4"
          onError={(e) => {
            console.log('❌ Image failed to load:', post.image);
            e.target.style.display = 'none';
          }}
        />
      )}
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {post.author?.name || "Anonymous"} •{" "}
        {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">
        {post.body}
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        ← Back to Posts
      </Link>
    </div>
  );
}
