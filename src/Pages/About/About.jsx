import React from "react";
import { motion } from "framer-motion";

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
    </div>
  );
};

export default About;
