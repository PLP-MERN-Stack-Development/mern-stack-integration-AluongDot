import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPosts, deletePost, createPost, updatePost } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0 });
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    title: "",
    body: "",
    author: user?.name || "",
    category: "",
    status: "draft",
  });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);

  const categories = [
    "Technology", "Lifestyle", "Travel", "Health", "Sports", "Education", "Food", "Entertainment",
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();

      const posts = Array.isArray(data)
        ? data
        : data.posts || data.data || [];

      const myPosts = posts.filter(
        (p) => p.author?.toLowerCase() === user?.name?.toLowerCase()
      );

      setUserPosts(myPosts);
      setStats({
        total: myPosts.length,
        published: myPosts.filter((p) => p.status === "published").length,
        draft: myPosts.filter((p) => p.status === "draft").length,
      });
    } catch (err) {
      console.error("❌ Error loading posts:", err);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      toast.success("🗑 Post deleted");
      loadPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("Failed to delete post");
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      status: post.status,
    });
    setFile(null);
    setPreview(
      post.image
        ? `http://localhost:5000${post.image}`
        : null
    );
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setForm({
      title: "",
      body: "",
      author: user?.name || "",
      category: "",
      status: "draft",
    });
    setFile(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.body || !form.author || !form.category)
      return toast.warn("⚠ Please fill all fields");

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (file) formData.append("image", file);

    try {
      setSaving(true);
      if (editingPost) {
        await updatePost(editingPost._id, formData);
        toast.success("✅ Post updated successfully!");
      } else {
        await createPost(formData);
        toast.success("📝 Post created successfully!");
      }
      handleCancelEdit();
      loadPosts();
    } catch (err) {
      console.error("❌ Error saving post:", err);
      toast.error("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d) ? "N/A" : `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <ToastContainer position="top-right" autoClose={2500} />

      <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleCancelEdit}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition"
        >
          {editingPost ? "Cancel Edit" : "Create Post"}
        </button>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Posts" value={stats.total} color="sky" />
        <StatCard label="Published" value={stats.published} color="green" />
        <StatCard label="Drafts" value={stats.draft} color="yellow" />
      </section>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-2xl mx-auto"
      >
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          {editingPost ? "Edit Post" : "Create New Post"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-sky-400"
          />
          <input
            type="text"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border rounded-md p-2 w-full focus:ring-2 focus:ring-sky-400"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <textarea
          rows="4"
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="border rounded-md p-2 w-full focus:ring-2 focus:ring-sky-400"
        ></textarea>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-sky-400"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto max-h-64 object-cover rounded mt-2"
          />
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg w-full transition"
        >
          {saving ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
        </button>
      </form>

      <section>
        <h2 className="text-lg font-semibold mt-8 mb-4 text-gray-800 text-center">
          Your Posts
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : userPosts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition"
              >
                {post.image && (
                  <img
                    src={
                      post.image.startsWith("http")
                        ? post.image
                        : `http://localhost:5000${post.image}`
                    }
                    alt={post.title}
                    className="w-full h-56 sm:h-60 object-cover rounded-t-xl"
                    onError={(e) => {
                      console.log("❌ Image failed to load:", post.image);
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-500">👤 {post.author}</p>
                  <p className="text-sm text-gray-500">🏷 {post.category}</p>
                  <p className="text-sm text-gray-500">
                    🕒 {formatDateTime(post.createdAt)}
                  </p>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {post.body}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-sky-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

const StatCard = ({ label, value, color }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = Math.max(Math.floor(duration / (value || 1)), 20);

    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start >= value) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const colorClass =
    color === "green"
      ? "border-green-400 text-green-600"
      : color === "yellow"
      ? "border-yellow-400 text-yellow-600"
      : "border-sky-400 text-sky-600";

  return (
    <div
      className={`bg-white border-2 ${colorClass} p-6 rounded-xl shadow text-center hover:shadow-md transition transform hover:scale-105`}
    >
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-3xl font-bold mt-2">{displayValue}</div>
    </div>
  );
};
