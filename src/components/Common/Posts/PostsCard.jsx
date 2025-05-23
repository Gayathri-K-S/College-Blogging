import React from 'react';
import useFetch from "../../hooks/useFetch";
import { Blog } from "../../../Context/Context";
import { readTime } from "../../../utils/helper";
import SavedPost from "./Actions/SavedPost";
import moment from "moment/moment";
import Actions from './Actions/Actions';
import { useNavigate } from 'react-router-dom';

const PostsCard = ({ post }) => {
  const { title, desc, created, postImg, id: postId, userId } = post;
  const { currentUser } = Blog();
  const { data, loading } = useFetch("users");
  
  // Safely get user data
  const getUserData = data ? data.find((user) => user.id === userId) : null;

  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <>
      <div onClick={() => navigate(`/post/${postId}`)} className="flex flex-col sm:flex-row gap-4 cursor-pointer ">
        <div className="flex-[2.5]">
          {/* Safeguard against undefined getUserData */}
          <p className="pb-2 font-semibold capitalize">{getUserData ? getUserData.username : "Unknown User"}</p>
          <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
            {title}
          </h2>
          <div
            className="py-1 text-gray-500 line-clamp-2 leading-5"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
        {postImg && (
          <div className="flex-[1]">
            <img
              src={postImg}
              alt="postImg"
              className="w-[53rem] h-[8rem] object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between w-full md:w-[70%] mt-[2rem] md:mt-0">
        <p className="text-xs text-gray-600">
          {readTime({ __html: desc })} min read .
          {moment(created).format("MMM DD")}
        </p>
        <div className="flex items-center gap-3">
          <SavedPost post={post} getUserData={getUserData} />
          {currentUser?.uid === userId && <Actions postId={postId} title={title} desc={desc} />}
        </div>
      </div>
    </>
  );
};

export default PostsCard;
