import React, { useState } from "react";
import { motion } from "framer-motion";
import { createCategory } from "../services/operations/courseAPI"; // Your service function
import toast from "react-hot-toast";

const CreateCategoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await createCategory(formData);
      toast.success("Category created successfully!");
      setFormData({ name: "", description: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded-md font-semibold transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Category"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateCategoryForm;
