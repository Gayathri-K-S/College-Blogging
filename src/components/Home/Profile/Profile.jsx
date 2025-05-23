import React, { useState } from "react";
import ProfileHome from "./Activities/ProfileHome";
import ProfileLists from "./Activities/ProfileLists";
import ProfileAbout from "./Activities/ProfileAbout";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSettingsSharp } from "react-icons/io5";

import EditProfile from "./EditProfile";
import { Blog } from "../../../Context/Context";
import { useParams } from "react-router-dom";
import useSingleFetch from "../../hooks/useSingleFetch";



const Profile = () => {
  
  const activities = [
    {
      title: "Home",
      comp: ProfileHome,
    },
    {
      title: "Lists",
      comp: ProfileLists,
    },
    {
      title: "About",
      comp: ProfileAbout,
    },
  ];
  const [currentActive, setCurrentActive] = useState(activities[0]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const {allUsers, currentUser}=Blog(); {/* from context */}
  const { userId } = useParams();

  const getUserData = allUsers.find((user) => user.id === userId);

  const { data: follows } = useSingleFetch("users", userId, "follows");
  const { data: followers } = useSingleFetch("users", userId, "followers");

  console.log(followers,follows);

  return (
    <section className="size flex gap-[4rem] relative">
      {/* users activities  */}
      <div className="mt-[9rem] flex-[2]">
        <div className="flex items-end gap-4">
          <h2 className="text-3xl sm:text-5xl font-bold capitalize">
          {getUserData?.username}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Followers({followers.length})
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            Followings({follows.length})
          </p>
        </div>
        <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]">
          {activities.map((item, i) => (
            <div
              key={i}
              className={`py-[0.5rem]
            ${
              item.title === currentActive.title
                ? "border-b border-gray-500"
                : ""
            }
            `}>
              <button onClick={() => setCurrentActive(item)}>
                {item.title}
              </button>
            </div>
          ))}
        </div>
        <currentActive.comp
          getUserData={getUserData}
          setEditModal={setEditModal}
        />
       </div>
        {/* button to open the side bar  */}
       <button
        onClick={() => setModal(true)}
        className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white
        grid place-items-center md:hidden">
        <IoSettingsSharp />
      </button>
       {/* user details*/}
       <Modal  modal={modal} setModal={setModal}>
       <div
          className={`flex-[1] border-l border-gray-300 p-[2rem] z-10 fixed 
            right-0 bottom-0 top-0 w-[18rem] bg-white md:relative
            ${modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"} transition-all duration-500`}>
            {/*icons to close out model*/}
            <div className="pb-4 text-right">
            <button
              onClick={() => setModal(false)}
              className="inline-block md:hidden">
              <LiaTimesSolid />
            </button>
          </div>
          {/*profile details*/}
          <div className="sticky top-7 flex flex-col justify-between">
            <img
              className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
              src={getUserData?.userImg||"https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"}
              alt="profile-img"
            />
            <h2 className="py-2 font-bold capitalize">{getUserData?.username}</h2>
            <p className="text-gray-500 first-letter:uppercase text-sm">
                {getUserData?.bio}</p>
                {currentUser?.uid === getUserData?.userId && (
              <button
                onClick={() => setEditModal(true)}
                className="text-green-700 pt-6 text-sm w-fit">
                Edit Profile
              </button>
            )}
              {/*navs*/}
             
          </div>
          </div>

       </Modal>
       {editModal &&   <EditProfile  getUserData={getUserData}
       editModal={editModal}
          setEditModal={setEditModal}/>}
      
       
    </section>
  );
};

export default Profile;