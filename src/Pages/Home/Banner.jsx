import React from 'react'
import { motion } from "framer-motion";


const Banner = () => {
  return (
    <div>
      <div className="min-h-screen bg-light-pattern dark:bg-dark-pattern text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center px-6 ">
        {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-indigo-400">Riaz Ahammed's Blog</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Sharing insights, tutorials, and my journey as a web developer.
        </p>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="mt-10 max-w-3xl bg-white/5 dark:bg-white/10 backdrop-blur-lg rounded-xl shadow-md p-8"
      >
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          Hi, I’m Riaz, a passionate web developer sharing my knowledge about
          JavaScript, React, Node.js, and all things coding. On this blog,
          you’ll find tutorials, tips, and personal stories from my journey in
          tech. Let’s grow together!
        </p>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="mt-10"
      >
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg text-white font-semibold hover:scale-105 transition transform">
          Read My Blog
        </button>
      </motion.div>
      </div>
    </div>
  )
}

export default Banner