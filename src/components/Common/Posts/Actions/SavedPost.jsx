import React, { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { Blog } from "../../../../Context/Context";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify";
import useSingleFetch from "../../../hooks/useSingleFetch";

const SavedPost = ({ post }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { currentUser, setAuthModel } = Blog();
  const { data } = useSingleFetch("users", post?.userId, "savePost");
  
  // Log data for debugging purposes
  console.log(data);

  // Check if the post is saved based on fetched data
  useEffect(() => {
    const saved = data && data?.find((item) => item.id === post.id);
    setIsSaved(!!saved);
    console.log("Is post saved:", saved); // Debugging the save state
  }, [data, post?.id]);

  // Handle saving or unsaving the post
  const handleSave = async () => {
    try {
      if (currentUser) {
        const saveRef = doc(
          db,
          "users",
          currentUser?.uid,
          "savePost",
          post?.id
        );

        if (isSaved) {
          await deleteDoc(saveRef);
          toast.success("Post has been unsaved");
        } else {
          await setDoc(saveRef, {
            ...post,
          });
          toast.success("Post has been Saved");
        }

        // Toggle the saved state after saving or unsaving
        setIsSaved(!isSaved);
      } else {
        setAuthModel(true); // Open auth modal if no user is logged in
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <button 
        onClick={handleSave} 
        className="hover:opacity-60"
      >
        <CiSaveDown2
          className={`text-2xl pointer-event-none ${
            isSaved ? "text-yellow-600" : "text-black"
          }`}
        />
      </button>
    </div>
  );
};

export default SavedPost;
