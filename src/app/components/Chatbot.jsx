"use client";
import { useState } from "react";
import Loader from "./Loader";
import Chat from "./Chat";
import showdown from "showdown";


function ChatBot({filePath}) {
    const [prompt, setPrompt] = useState("");
    const conv = new showdown.Converter();
    const [chats, setChats] = useState([]);
  
  
    const [loading, setLoading] = useState(false);
    
  
    const chat = async () => {
      setLoading(true);
      try {
        let res = await fetch('http://127.0.0.1:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question: prompt })
        });
  
        if (!res.ok) {
          throw new Error('Network response was not ok ' + res.statusText);
        }
  
        let data = await res.text();
        console.log(res);
        console.log(data);
        setChats((prevChats) => [
          ...prevChats,
          <Chat key={prevChats.length + 1} isUser={false} message={conv.makeHtml(data)} loading={false} />
        ]);
  
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleChange = (e) => {
      setPrompt(e.target.value);
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };
  
    const handleSubmit = () => {
      if (prompt.trim() !== '') {
        setChats([...chats, <Chat key={chats.length} isUser={true} userPrompt={prompt} />]);
        chat(); 
        setPrompt(''); 
      }
      
    };
  
    
  
    return (
    <>
      
        <div className="min-h-screen bg-slate-900 w-[50vw] flex flex-col justify-center items-center text-white overflow-auto ">
          <div id="customScrollBar" className=" flex flex-col justify-between h-[80vh] w-[100%] text-sm sm:text-md mb-5 rounded-md px-2 overflow-auto overflow-y-scroll">
            <div>
              {chats}
              {loading && <Loader />}
            </div>
          </div>
          <div className={`flex justify-center items-center bg-slate-800  shadow-[0_0px_10px_-1px_rgba(0,0,0,0.2)] px-4 py-3 mb-5 rounded-md w-[80%] lg:w-[85%] ${filePath=== null ?'cursor-not-allowed' : ''}`}>
              
              <input
                type="text"
                value={prompt}
                onChange={(e) => handleChange(e)}
                onKeyDown={handleKeyDown}
                placeholder="Chat..."
                name="chat"
                id="chat"
                className={`bg-transparent w-[80%] focus:outline-none ${filePath=== null ?'cursor-not-allowed' : ''}`}
              />
              <button
                id="btn"
                onClick={handleSubmit}
                className={`py-2 px-2 ${filePath=== null ?'cursor-not-allowed' : ''}`}
              >
                <svg 
                  className="w-5 h-5 rotate-90 rtl:-rotate-90" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor" 
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                </svg>
              </button>
            </div>
            {filePath === null && (
                <div className="absolute h-[50vh] w-[30vw] bg-slate-800 border-2 border-slate-300 border-dashed text-white rounded-md">
                    <div className="flex flex-col justify-around items-center h-[100%] text-[1rem] px-2  font-outfit">
                        <h3 className="font-semibold  text-[2rem]">
                            You can upload any PDF and ask question from it.
                        </h3>
                        <p>
                            Your chats will apear here!
                        </p>
                    </div>
                </div>
            ) }
        </div>
      </>
    );
  }
  
  export default ChatBot;
  