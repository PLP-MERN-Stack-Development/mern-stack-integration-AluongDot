import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading post...</p>;
  if (!post) return <p className="text-center py-10 text-gray-500">Post not found.</p>;

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>

      {post.image && (
        <img
          src={post.image.startsWith('http') 
            ? post.image 
            : `${import.meta.env.VITE_API_URL}${post.image}`}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
          onError={(e) => {
            console.log('❌ Image failed to load:', post.image);
            e.target.style.display = 'none';
          }}
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">By {post.author} • {post.category}</p>
      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
        {post.body}
      </div>
    </section>
  );
}
