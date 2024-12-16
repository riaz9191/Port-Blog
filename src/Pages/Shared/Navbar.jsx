import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [mode, setMode] = useState("system");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showMiniSidebar, setShowMiniSidebar] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (mode === "dark" || (mode === "system" && systemPrefersDark)) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavbar(false);
        setShowMiniSidebar(true);
      } else {
        setShowNavbar(true);
        setShowMiniSidebar(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white/10 dark:bg-black/20 backdrop-blur-lg border-b border-white/20 dark:border-black/30 shadow-md transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="text-lg font-bold text-gray-800 dark:text-gray-100">
            <Link to="/">MyBlog</Link>
          </div>

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

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="ml-4 p-2 rounded-full shadow-lg focus:outline-none"
            >
              <motion.div
                className="text-2xl"
                animate={{ rotate: mode === "dark" ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {mode === "light" ? "🌞" : "🌙"}
              </motion.div>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li
                    onClick={() => handleModeChange("light")}
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Light
                  </li>
                  <li
                    onClick={() => handleModeChange("dark")}
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Dark
                  </li>
                  <li
                    onClick={() => handleModeChange("system")}
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    System
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Mini Sidebar */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 left-0 bg-white dark:bg-gray-800 rounded-r-lg shadow-lg transition-transform duration-300 ${
          showMiniSidebar ? "translate-x-0 w-12" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col space-y-4 items-center py-4 shadow-md">
          {navLinks.map((link) => (
            <li
              key={link.path}
              className="group relative w-full overflow"
            >
              <Link
                to={link.path}
                className={`block text-sm text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white w-12 group-hover:w-32 transition-all duration-300 text-center py-2 rounded-r-lg`}
              >
                {link.name.charAt(0)}
                <span className="absolute opacity-0 group-hover:opacity-100 ml-2 transition-opacity duration-300">
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
