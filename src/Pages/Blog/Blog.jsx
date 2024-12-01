import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blog = () => {
  // Categories and blogs data
  const categories = [
    { name: 'Technology', subcategories: ['React', 'JavaScript', 'AI'] },
    { name: 'Lifestyle', subcategories: ['Travel', 'Health', 'Fashion'] },
    { name: 'Finance', subcategories: ['Investing', 'Savings', 'Cryptocurrency'] },
  ];

  const allBlogs = [
    { id: 1, title: 'Understanding React', category: 'React', content: 'React is a powerful library...' },
    { id: 2, title: 'JavaScript Best Practices', category: 'JavaScript', content: 'Learn the best practices...' },
    { id: 3, title: 'AI Trends in 2024', category: 'AI', content: 'Artificial Intelligence is evolving...' },
    { id: 4, title: 'Travel Tips for Beginners', category: 'Travel', content: 'Traveling can be exciting...' },
    { id: 5, title: 'How to Save Money', category: 'Savings', content: 'Learn to manage your finances...' },
    { id: 6, title: 'Cryptocurrency 101', category: 'Cryptocurrency', content: 'An introduction to cryptocurrency...' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('Latest Blogs');
  const [filteredBlogs, setFilteredBlogs] = useState(allBlogs);
  const [openCategories, setOpenCategories] = useState({});

  const handleCategoryClick = (category, subcategory = null) => {
    const filter = subcategory || category;
    setSelectedCategory(filter);
    const newBlogs = allBlogs.filter((blog) => blog.category === filter);
    setFilteredBlogs(newBlogs.length ? newBlogs : allBlogs);
  };

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="lg:flex bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/5 p-4 bg-white dark:bg-gray-800 shadow-md mt-10">
          <h2 className="text-lg font-semibold text-center">Categories</h2>
          <ul className="mt-4">
            {categories.map(({ name, subcategories }) => (
              <li key={name} className="mb-2">
                <div
                  className="flex justify-between items-center cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                  onClick={() => toggleCategory(name)}
                >
                  <span>{name}</span>
                  <span>{openCategories[name] ? '-' : '+'}</span>
                </div>
                <AnimatePresence>
                  {openCategories[name] && (
                    <motion.ul
                      className="pl-4 mt-2 space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {subcategories.map((subcategory) => (
                        <li
                          key={subcategory}
                          className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                          onClick={() => handleCategoryClick(name, subcategory)}
                        >
                          {subcategory}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">{selectedCategory}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden relative transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                      <Link to={`/blog/${blog.id}`}>
                  <div className="relative h-40 bg-gray-200 dark:bg-gray-700 rounded-t-lg">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <h2 className="text-lg font-bold mt-4">{blog.title}</h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{blog.content}</p>
                  <button className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
                    Read More
                  </button>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Blog;
