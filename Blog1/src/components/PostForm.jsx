// src/components/PostForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../api/useApi";
import { usePosts } from "../context/PostsContext";


export default function PostForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request } = useApi();
  const { state, dispatch } = usePosts();
  const { categories } = state;

  const [values, setValues] = useState({ title: "", content: "", category: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      (async () => {
        try {
          const data = await request({ url: `/posts/${id}` });
          setValues({ title: data.title || "", content: data.content || "", category: data.category?._id || "" });
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [isEdit, id, request]);

  const handleChange = (e) => setValues(v => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        const updated = await request({ method: "PUT", url: `/posts/${id}`, data: values });
        dispatch({ type: "UPDATE_POST", payload: updated });
      } else {
        const created = await request({ method: "POST", url: "/posts", data: values });
        dispatch({ type: "ADD_POST", payload: created });
      }
      navigate("/");
    } catch (err) {
      alert("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{isEdit ? "Edit Post" : "Create Post"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" value={values.title} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select>
  {categories.map((category) => (
    <option key={category.id} value={category.name}>
      {category.name}
    </option>
  ))}
</select>

        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea name="content" rows="8" value={values.content} onChange={handleChange} required className="w-full border rounded px-3 py-2"></textarea>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? "Saving..." : (isEdit ? "Update Post" : "Create Post")}
          </button>
          <button type="button" onClick={() => navigate("/")} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
