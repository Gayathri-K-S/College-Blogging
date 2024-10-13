// import React from "react";
// import { Blog } from "../../Context/Context";
// import { BsGraphUpArrow } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// import { readTime } from "../../utils/helper";

// const Trending = () => {
//   const { postData, allUsers } = Blog(); // Fetch allUsers along with postData
//   const getTrending =
//     postData && postData?.sort((a, b) => b.pageViews - a.pageViews);
  
//   return (
//     <section className="border-b border-gray-600">
//       <div className="size py-[2rem]">
//         <div className="flex items-center gap-3 font-semibold">
//           <span>
//             <BsGraphUpArrow />
//           </span>
//           <h2>Trending on PenIt</h2>
//         </div>
//         <div className="grid grid-cols-card gap-3">
//           {getTrending &&
//             getTrending
//               .slice(0, 6)
//               .map((trend, i) => (
//                 <Trend trend={trend} key={i} index={i} allUsers={allUsers} />
//               ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Trending;

// const Trend = ({ trend, index, allUsers }) => {
//   const navigate = useNavigate();
  
//   // Find the user associated with this post using the userId
//   const user = allUsers.find((u) => u.id === trend.userId);

//   return (
//     <main className="flex gap-4 w-full">
//       <span className="text-gray-400 text-4xl mt-4">{index + 1}</span>
//       <div className="py-6 flex flex-col gap-3">
//         <div className="flex items-center gap-2">
//           <div
//             onClick={() => navigate(`/profile/${trend?.userId}`)}
//             className="flex items-center gap-2 cursor-pointer hover:opacity-75"
//           >
//             <img
//               className="w-[1.3rem] h-[1.3rem] object-cover rounded-full"
//               src={user?.userImg || "defaultImg.jpg"} // Use user's image or a default image
//               alt="userImg"
//             />
//             <h2 className="font-semibold text-sm capitalize">
//               {user?.username || "Unknown User"} {/* Display username or fallback */}
//             </h2>
//           </div>
//         </div>
//         <div
//           onClick={() => navigate(`/post/${trend?.id}`)}
//           className="flex flex-col gap-4 cursor-pointer hover:opacity-75"
//         >
//           <p className="w-full md:w-[18rem] text-md font-bold line-clamp-2">
//             {trend.title}
//           </p>
//           <p className="text-gray-500 text-xs">
//             {moment(trend?.created).format("MMM YY")}
//             {` ${readTime(trend.desc)} min read`}
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// };

import React from "react";
import { Blog } from "../../Context/Context";
import { BsGraphUpArrow } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { readTime } from "../../utils/helper";

const Trending = () => {
  const { postData, allUsers } = Blog(); // Fetch allUsers along with postData
  const getTrending =
    postData && postData?.sort((a, b) => b.pageViews - a.pageViews);
  
  return (
    <section className="border-b border-gray-600">
      <div className="size py-[2rem]">
        <div className="flex items-center gap-3 font-semibold">
          <span>
            <BsGraphUpArrow />
          </span>
          <h2>Trending on PenIt</h2>
        </div>
        <div className="grid grid-cols-card gap-3">
          {getTrending &&
            getTrending
              .slice(0, 6)
              .map((trend, i) => (
                <Trend trend={trend} key={i} index={i} allUsers={allUsers} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;

const Trend = ({ trend, index, allUsers }) => {
  const navigate = useNavigate();
  
  // Find the user associated with this post using the userId
  const user = allUsers.find((u) => u.id === trend.userId);

  return (
    <main className="flex gap-4 w-full">
      <span className="text-gray-400 text-4xl mt-4">{index + 1}</span>
      <div className="py-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div
            onClick={() => navigate(`/profile/${trend?.userId}`)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-75"
          >
            <img
              className="w-[1.3rem] h-[1.3rem] object-cover rounded-full"
              src={user?.userImg || "defaultImg.jpg"} // Use user's image or a default image
              alt="userImg"
            />
            <h2 className="font-semibold text-sm capitalize">
              {user?.username || "Unknown User"} {/* Display username or fallback */}
            </h2>
          </div>
        </div>
        <div
          onClick={() => navigate(`/post/${trend?.id}`)}
          className="flex flex-col gap-4 cursor-pointer hover:opacity-75"
        >
          <p className="w-full md:w-[18rem] text-md font-bold line-clamp-2">
            {trend.title}
          </p>
          <p className="text-gray-500 text-xs">
            {moment(trend?.created).format("MMM YY")}
            {` ${readTime(trend.desc)} min read`}
          </p>
        </div>
      </div>
    </main>
  );
};
