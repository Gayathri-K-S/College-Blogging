import React from "react";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../../../Context/Context";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify";

const Actions = ({ postId, title, desc }) => {
  const { setUpdateData, currentUser } = Blog();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editPost/${postId}`);
    setUpdateData({ title, description: desc });
  };

  const handleRemove = async () => {
    try {
      const ref = doc(db, "posts", postId);
      const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);
      const commentRef = doc(db, "posts", postId, "comments", currentUser?.uid);
      const savedPostRef = doc(
        db,
        "users",
        currentUser?.uid,
        "savedPost",
        postId
      );

      await deleteDoc(ref);
      await deleteDoc(likeRef);
      await deleteDoc(commentRef);
      await deleteDoc(savedPostRef);

      toast.success("Post has been removed");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return <div className="relative">{/* Actions without dropdown */}</div>;
};

export default Actions;
