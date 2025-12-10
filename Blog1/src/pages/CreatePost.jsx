import React, { useState } from "react";
import { createPost } from "../services/api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("draft");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const categories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Health",
    "Sports",
    "Education",
    "Food",
    "Entertainment",
  ];

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body || !author || !category) {
      return alert("All fields are required!");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("status", status);
    if (file) formData.append("image", file);

    try {
      setSaving(true);
      await createPost(formData);
      alert("✅ Post created successfully!");
      // Reset form
      setTitle("");
      setBody("");
      setAuthor("");
      setCategory("");
      setStatus("draft");
      setFile(null);
    } catch (err) {
      console.error("Error creating post:", err);
      alert("❌ Failed to create post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-5 sm:p-8 rounded-xl shadow-md max-w-2xl mx-auto space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Create Blog Post
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          rows="6"
          placeholder="Write your content..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
        ></textarea>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          />
        </div>

        <div className="flex justify-center sm:justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg shadow-sm transition duration-300 focus:ring-2 focus:ring-sky-400 disabled:opacity-70"
          >
            {saving ? "Saving..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}