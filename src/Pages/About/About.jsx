import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa"; // Importing icons

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-16">
      <motion.div
        className="container mx-auto max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Section Title */}
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          variants={fadeInUp}
        >
          About Me
        </motion.h1>

        {/* Intro Section */}
        <motion.p
          className="text-lg leading-8 mb-6 text-center"
          variants={fadeInUp}
        >
          Hi, I'm <span className="text-indigo-500 font-bold">Riaz Ahammed</span>, 
          a passionate web developer with experience in building responsive, 
          user-friendly web applications. I love creating clean, modern designs 
          with optimized functionality.
        </motion.p>

        {/* Skills Section */}
        <motion.div className="mb-12" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold mb-4 text-center">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js"].map(
              (skill, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-semibold">{skill}</span>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div className="text-center" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            I'm open to new opportunities and collaborations. Feel free to reach
            out!
          </p>
          <a
            href="mailto:your-email@example.com"
            className="inline-block bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* Enhanced Footer Section */}
      <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-gray-200 py-8 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-lg mb-2">
            &copy; {new Date().getFullYear()} Riaz Ahammed. All rights reserved.
          </p>
          <p className="text-sm mb-4">
            Follow me on:
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition">
              <FaTwitter size={24} />
            </a>
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition">
              <FaLinkedin size={24} />
            </a>
          </div>
          <p className="text-sm">
            <a href="/privacy-policy" className="text-gray-200 hover:underline">Privacy Policy</a> | 
            <a href="/terms-of-service" className="text-gray-200 hover:underline"> Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;