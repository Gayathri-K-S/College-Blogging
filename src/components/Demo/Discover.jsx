import React from "react";
import { discover} from "../../data";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-[6rem]">
      <div className="border-b border-gray-400 pb-7">
        <h2 className="font-semibold">Discover more of what matters to you</h2>
        <div className="my-2 flex items-center gap-3 flex-wrap">
          {discover.map((item, i) => (
            <button
              onClick={() => navigate(`/filter/${item.toLowerCase()}`)}
              key={i}
              className="bg-gray-200 py-2 px-3 text-sm rounded-full">
              {item}
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Discover;