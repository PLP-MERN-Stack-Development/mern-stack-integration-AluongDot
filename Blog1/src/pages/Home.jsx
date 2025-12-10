import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Post from "./Post";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // use Vite env var so the base API URL isn't hardcoded
      const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api";
      const res = await fetch(`${apiBase}/posts`);
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = posts.filter((post) => {
      const title = (post.title || "").toLowerCase();
      const body = (post.body || post.content || "").toLowerCase();
      return title.includes(term) || body.includes(term);
    });
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to MERN Blog
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover amazing stories and share your thoughts with the world.
        </p>
        <Link
          to="/create"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Write Your First Post
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      ) : (
        <Post posts={filteredPosts} />
      )}
    </div>
  );
}
