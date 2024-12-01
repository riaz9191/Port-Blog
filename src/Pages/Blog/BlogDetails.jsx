import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const { id: id } = useParams();

  // Mock data for demonstration
  const blogs = [
    { id: 1, title: 'Understanding React', content: 'React is a powerful library...' },
    { id: 2, title: 'Exploring Tailwind CSS', content: 'Tailwind CSS is a utility-first CSS framework...' },
    { id: 3, title: 'A Guide to Next.js', content: 'Next.js is a React framework...' },
  ];

  // Find the blog matching the _id
  const blog = blogs.find((blog) => blog.id.toString() === id);

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center">Blog not found.</div>;
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700 mt-4">{blog.content}</p>
      <button
        onClick={() => window.history.back()}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Back to Blogs
      </button>
    </div>
  );
};

export default BlogDetails;
