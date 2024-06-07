"use client"; 

import { useState } from "react";

export default function Home() {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      // Handle file upload logic here
      console.log('File selected:', selectedFile);
    } else {
      console.log('No file selected');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-[4rem] text-green-600">  
        Lorem ipsum lorem ipsum 
      </h1>
      {/* <form onSubmit={handleSubmit} className="">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form> */}
      
      <div class="flex items-center justify-center w-[60%]">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-green-100 hover:border-[3px] hover:border-green-300 ">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 hover:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500"><span class="font-semibold text-black/80">Click to upload</span> or drag and drop</p>
                  {/* <p class="text-xs text-gray-500 dark:text-gray-400">PDF</p> */}
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
          </label>
      </div> 

      
    </main>
  );
}
