import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link } from "react-router-dom";
import { nav } from "../../data.js"; // Adjust the path based on your directory structure
import Auth from "./Auth/Auth";

const DemoHeader = () => {
  const [isActive, setIsActive] = useState(false); // useState hook
  const [modal,setModal] = useState(false);
  
  useEffect(() => {
    const scrollMe = () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", scrollMe);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", scrollMe);
    };
  }, []);

  return (
    <header
    className={`border-b border-black sticky top-0 z-50 
    ${isActive ? "bg-white" : "bg-[rgb(189,123,101)]"} 
    transition-all duration-500`}
  >
      <div className="size h-[70px] flex items-center justify-between">
        <Link to={"/"}>
          <img
            className="h-[2.5rem]"
            src="../../../public/PenIt_logo.jpg"
            alt="logo"
          />
        </Link>
        <div className="flex items-center gap-5">
          <div className="hidden text-sm sm:flex items-center gap-5">
            {nav.map((link, i) => (
              <Link key={i} to={link.path} className="text-black hover:underline">
                {link.title}
              </Link>
            ))}
          </div>
          <div className="relative">
            <button 
            onClick={() => setModal(true)}
            className="hidden text-sm sm:flex items-center gap-5">
              Sign In
            </button>
            <Auth modal={modal} setModal={setModal} />
          </div>
          <button  
             onClick={() => setModal(true)}
            className={`text-white rounded-full px-3 p-2 text-sm font-medium
            ${isActive ? "bg-green-700" : "bg-black"}
            `}>
              Get Started
            </button>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;
