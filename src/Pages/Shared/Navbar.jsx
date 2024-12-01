import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation(); // Get the current route

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    // Add or remove the "dark" class from the <html> element
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.remove("dark");
    } else {
      htmlElement.classList.add("dark");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/10 dark:bg-black/20 backdrop-blur-lg border-b border-white/20 dark:border-black/30 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-lg font-bold text-gray-800 dark:text-gray-100">
          <Link to="/">MyBlog</Link>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300">
          {navLinks.map((link) => (
            <li key={link.path} className="relative group">
              <Link
                to={link.path}
                className={`hover:text-gray-900 dark:hover:text-gray-100 transition-all ${
                  location.pathname === link.path
                    ? "text-indigo-500 dark:text-indigo-400"
                    : ""
                }`}
              >
                {link.name}
              </Link>
              {/* Active Link Indicator */}
              {location.pathname === link.path && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 rounded"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 p-2 rounded-full shadow-lg focus:outline-none hover:scale-105 transform transition"
        >
          <motion.div
            className="text-2xl"
            animate={{ rotate: darkMode ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {darkMode ? "🌞" : "🌙"}
          </motion.div>
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-800 dark:text-gray-100 p-2">
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 7.5h16.5m-16.5 7.5h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
