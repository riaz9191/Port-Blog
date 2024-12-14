import React, { useState, useMemo, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

import YooptaEditor, {
  createYooptaEditor,
  YooptaContentValue,
  YooptaOnChangeOptions,
} from "@yoopta/editor";

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
import axios from "axios";
import toast from "react-hot-toast";

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

const CreateBlog = () => {
  // Initialize editor instance
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    slug: "",
    heading: "",
    subHeading: "",
    startDate: "",
    coverPhoto: "",
    documentLink: "",
    status: true,
  });

  const { setTheme, theme } = useTheme();
  const selectionRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleYooptaChange = (newValue, options) => {
    setValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      details: value, // Add Yoopta editor content
    };

    try {
      const response = await axios.post(
        "https://blog-backend-roan-three.vercel.app/api/v1/settest",
        payload
      );

      console.log("Response from server:", response.data);
      toast.success("Post News Successfully");

    } catch (error) {
      console.error("Error creating blog:", error);
      alert("An error occurred. Please try again.");
    }
  };

  //////////////////////////////////
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `https://blog-backend-roan-three.vercel.app/api/v1/getCategory`
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen transition-colors duration-500`}
      ref={selectionRef}
    >
      <h1 className="text-4xl font-bold mb-8 drop-shadow-md">Create Blog</h1>

      <form
        className={`w-full max-w-4xl p-6 rounded-3xl shadow-2xl border ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-gray-900"
        }`}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 border rounded-md w-full"
          />

          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            className="p-3 border rounded-md w-full"
          />

          <input
            type="text"
            name="heading"
            placeholder="Heading"
            value={formData.heading}
            onChange={handleChange}
            className="p-3 border rounded-md w-full"
          />

          <input
            type="text"
            name="subHeading"
            placeholder="Sub Heading"
            value={formData.subHeading}
            onChange={handleChange}
            className="p-3 border rounded-md w-full"
          />

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="p-3 border rounded-md w-full"
          />

          <input
            type="url"
            name="coverPhoto"
            placeholder="Cover Photo URL"
            value={formData.coverPhoto}
            onChange={handleChange}
            className="p-3 border rounded-md w-full"
          />

          <input
            type="url"
            name="documentLink"
            placeholder="Document Link"
            value={formData.documentLink}
            onChange={handleChange}
            className="p-3 border rounded-md w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Details</label>
          <YooptaEditor
            editor={editor}
            plugins={plugins}
            tools={TOOLS}
            // value={value}
            marks={MARKS}
            selectionBoxRoot={selectionRef}
            onChange={handleYooptaChange}
            placeholder="Press / for options"
            autoFocus
          />
        </div>

        <div className="flex items-center mb-6">
          <label className="text-lg mr-3">Status</label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={() =>
              setFormData((prev) => ({ ...prev, status: !prev.status }))
            }
            className="h-5 w-5"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
