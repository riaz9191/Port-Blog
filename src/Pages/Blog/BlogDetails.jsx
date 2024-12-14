import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
  </div>
);

const BlogDetails = () => {
  const { id } = useParams(); // Use destructuring to get _id from URL parameters
  const [blog, setBlog] = useState(null); // State to hold the blog data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(
          `https://blog-backend-roan-three.vercel.app/api/v1/gettest/${id}`
        );

        if (!response.ok) {
          throw new Error("Blog not found");
        }
        const data = await response.json();
        console.log(data);
        setBlog(data.data); // Set the blog data
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBlogDetails();
  }, [id]); // Dependency array includes _id

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  // Render rich-text content
  const renderDetails = (details) => {
    // Convert the details object to an array and sort by the `order` property
    const sortedDetails = Object.values(details).sort(
      (a, b) => a.meta.order - b.meta.order
    );

    return sortedDetails.map((item) => (
      <div
        key={item.id}
        className={`text-${item.meta.align} mb-4`}
      >
        {item.value.map((block) =>
          block.children.map((child, index) => (
            <p key={index} className="leading-relaxed">
              {child.text}
            </p>
          ))
        )}
      </div>
    ));
  };

  // Render blog details if the blog exists
  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{blog?.heading}</h1>
      {blog.coverPhoto && (
        <img
          src={blog.coverPhoto}
          alt="Cover"
          className="w-full h-auto object-cover rounded-md mb-4"
        />
      )}
      <p className="text-gray-600 italic mb-4">{blog.slug}</p>

      <div className="text-gray-800 mt-4 leading-relaxed">
        {renderDetails(blog.details)}
      </div>

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
