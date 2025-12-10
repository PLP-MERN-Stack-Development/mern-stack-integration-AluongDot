import React from "react";

function CategoryFilter({ categories, category, setCategory }) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="border border-gray-300 rounded-lg px-3 py-2 mt-3 sm:mt-0"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;