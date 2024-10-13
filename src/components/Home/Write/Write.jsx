import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import Quill from 'quill';
import AutoLinks from 'quill-auto-links';
import Preview from "./Preview";
import { Blog } from "../../../Context/Context";
// Assuming you added the CSS in Write.css

// Register the AutoLinks module with Quill
Quill.register('modules/autoLinks', AutoLinks);

const Write = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { publish, setPublish } = Blog();

  const modules = {
    toolbar: [
      [{ 'link': 'link' }], // Add link button to toolbar
    ],
    autoLinks: true // Enable autoLinks
  };

  return (
    <section className="w-[90%] md:w-[90%] lg:w-[60%] mx-auto py-[3rem]">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="text-4xl border rounded-md outline-none w-full font-semibold"
      />

      <ReactQuill
        theme="bubble"
        value={description}
        onChange={setDescription}
        modules={modules} // Add toolbar and auto-link detection
        placeholder="Tell Your Story..."
        className="write my-5" // Apply styles using this class
      />

      <div
        className={`${
          publish ? "visible opacity-100" : "invisible opacity-0"
        } transition-all duration-200`}
      >
        <Preview
          setPublish={setPublish}
          description={description}
          title={title}
        />
      </div>
    </section>
  );
};

export default Write;
