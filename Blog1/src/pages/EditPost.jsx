import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../services/api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const post = await getPost(id);
        setTitle(post.title || "");
        setBody(post.body || "");
        setCurrentImage(post.image || "");
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    load();
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return alert("Title and body are required");

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("status", "draft");
      if (file) formData.append("image", file);

      await updatePost(id, formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Could not update post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded shadow"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2 mb-3"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border rounded p-2 mb-3"
      />

      {currentImage && !file && (
        <img
          src={currentImage}
          alt="Current"
          className="mb-3 max-h-48 w-full object-cover rounded"
        />
      )}

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows="6"
        className="w-full border rounded p-2 mb-3"
      />

      <button
        type="submit"
        disabled={saving}
        className="bg-[#00BFFF] text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Update Post"}
      </button>
    </form>
  );
}
