import React from "react";
import { motion } from "framer-motion";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development",
      summary: "Discover the latest trends shaping the web development industry.",
      image: "https://via.placeholder.com/300",
      date: "Dec 1, 2024",
    },
    {
      id: 2,
      title: "Mastering React in 2024",
      summary: "A guide to becoming a React pro with the latest tools and techniques.",
      image: "https://via.placeholder.com/300",
      date: "Nov 29, 2024",
    },
    {
      id: 3,
      title: "Next.js for Beginners",
      summary: "Learn why Next.js is the framework of choice for modern web apps.",
      image: "https://via.placeholder.com/300",
      date: "Nov 20, 2024",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-16">
      <motion.div
        className="container mx-auto max-w-5xl"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.3 }}
      >
        {/* Page Title */}
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          variants={fadeInUp}
        >
          My Blog
        </motion.h1>

        {/* Search Bar */}
        <motion.div
          className="mb-10"
          variants={fadeInUp}
        >
          <input
            type="text"
            placeholder="Search blog posts..."
            className="w-full p-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={fadeInUp}
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {post.date}
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {post.summary}
                </p>
                <button className="mt-4 inline-block text-indigo-500 hover:text-indigo-600">
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Blog;
