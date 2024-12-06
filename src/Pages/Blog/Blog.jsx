import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
  </div>
);

const Blog = () => {
  // State for categories, blogs, and selected category
  const categories = [
    { name: 'Technology', subcategories: ['React', 'JavaScript', 'AI'] },
    { name: 'Lifestyle', subcategories: ['Travel', 'Health', 'Fashion'] },
    { name: 'Finance', subcategories: ['Investing', 'Savings', 'Cryptocurrency'] },
  ];

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Latest Blogs');
  const [openCategories, setOpenCategories] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Fetch blogs from the API on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://blog-backend-roan-three.vercel.app/api/v1/gettest');
        const data = await response.json();
        console.log(data.data)
        setBlogs(data.data); // Assuming the API returns an array of blogs
        setFilteredBlogs(data.data); // Initialize filtered blogs with fetched data
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleCategoryClick = (category, subcategory = null) => {
    const filter = subcategory || category;
    setSelectedCategory(filter);
    const newBlogs = blogs.filter((blog) => blog.category === filter);
    setFilteredBlogs(newBlogs.length ? newBlogs : blogs);
  };

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {loading ? (
        <Spinner />
      ) : (
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
                    className="p-4 bg-white/5 dark:bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden relative transition-all duration-300 border-2 dark:border-0 "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/blog/${blog._id}`}>
                      <div className="  rounded-t-lg  ">
                        <div className="px-4 py-2    rounded-b-lg">
                          <motion.div
                            className=" "
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <img className='rounded-t-lg' src={blog.coverPhoto} alt="" />
                          <h2 className="text-lg font-bold mt-4">{blog.heading}</h2>
                          <p className="mt-2 text-gray-400 dark:text-gray-300 uppercase">{blog.slug}</p>
                          <button className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
                            Read More
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default Blog;

