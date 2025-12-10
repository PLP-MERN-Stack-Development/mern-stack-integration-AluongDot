import React, { useEffect, useState } from "react";
import { getPosts, getCategories } from "../services/api";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [page, search, category]);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPosts(page, search, category);
      const postsList = Array.isArray(data)
        ? data
        : data.posts || data.data || [];
      setPosts(postsList);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <SearchBar onSearch={(q) => setSearch(q)} />
        <CategoryFilter
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading posts...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id || post.id}
              className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition"
            >
              {post.image && (
                <img
                  src={post.image.startsWith('http')
                    ? post.image
                    : `${(import.meta.env.VITE_API_URL || 'http://localhost:5000')}${post.image}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  {(post.body || '').slice(0, 160)}{(post.body || '').length > 160 ? '…' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
}
