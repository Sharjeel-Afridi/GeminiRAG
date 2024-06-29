"use client"; 

import { useState } from "react";
import ChatBot from "./components/Chatbot";
import Water from "../../public/water-icon.png";
import Image from "next/image";
export default function Home() {

  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF file.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setFilePath(data.filePath); // Assuming the backend returns the file path
          // setResponse(data.response); // Set the response if needed
        } else {
          alert("Failed to upload file.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while uploading the file.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("No file selected.");
    }
  };

  return (
    <div className="flex">
      <main className="flex min-h-screen w-[50vw] flex-col items-center justify-center bg-slate-900">
        {/* <h1 className="font-bold font-outfit text-[2rem] absolute top-5 left-5 gradient-text">
          TahaAI
        </h1> */}
        <Image src={Water} alt="logo" className="m-4 absolute top-0 left-5 rounded-full" width={50} height={50}/>
        {filePath ? (
          <object 
            className="pdf" 
            data={`http://127.0.0.1:5000/uploads/${filePath}`} 
            width="600" 
            height="500">
          </object>
        ) : (
          <div className="flex flex-col items-center justify-center gap-10 w-[60%] h-[90vh]">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-400 border-dashed rounded-lg cursor-pointer bg-slate-800  hover:border-blue-300"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-300 hover:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold text-gray-300">Click to upload</span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-400">PDF</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <button
              className="font-semibold text-white bg-transparent border-2 border-slate-400 hover:border-slate-300 py-3 px-5 rounded-md"
              onClick={handleSubmit}
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        )}

      </main>
      <ChatBot filePath={filePath}/>
    </div>
  );
}
