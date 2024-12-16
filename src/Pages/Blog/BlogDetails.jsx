import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import React, { useEffect, useMemo, useState } from "react";
import { data, useParams } from "react-router-dom";

// Import individual plugins for various editor features
import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import Table from "@yoopta/table";
import Code from "@yoopta/code";
import Callout from "@yoopta/callout";
import File from "@yoopta/file";
import Accordion from "@yoopta/accordion";
import Divider from "@yoopta/divider";
import Embed from "@yoopta/embed";
import Image from "@yoopta/image";
import Video from "@yoopta/video";
import Link from "@yoopta/link";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import ActionMenu, { DefaultActionMenuRender } from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";

// Define all plugins
const plugins = [
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Paragraph,
  Blockquote,
  NumberedList,
  BulletedList,
  TodoList,
  Table,
  Code,
  Callout,
  File,
  Accordion,
  Divider,
  Embed,
  Image,
  Video,
];

// Define all tools outside the component
const TOOLS = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: ActionMenu,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
};
const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

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
  const editor = useMemo(() => createYooptaEditor(), []);

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
  const yooptaValue = blog.details;
  // Render rich-text content

  // Render blog details if the blog exists
  return (
    <div className=" top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 z-100">
  <div className="min-h-screen max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
    <h1 className="text-4xl font-bold mb-4">{blog?.heading}</h1>
    {blog.coverPhoto && (
      <img
        src={blog.coverPhoto}
        alt="Cover"
        className="w-full h-auto object-cover rounded-md mb-4"
      />
    )}
    <p className="text-gray-600 italic mb-4">{blog.slug}</p>

    <div className="text-gray-800 mt-4 leading-relaxed dark:text-gray-100">
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        tools={TOOLS}
        marks={MARKS}
        value={yooptaValue} // Ensure value is always valid
        readOnly
        style={{ width: "100%" }}
      />
      {/* {renderDetails(blog.details)} */}
    </div>

    <button
      onClick={() => window.history.back()}
      className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      Back to Blogs
    </button>
  </div>
</div>

  );
};

export default BlogDetails;
