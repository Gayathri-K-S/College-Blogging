import React, { useState } from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SignUp = ({ setSignReq, setModal }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { username, email, password, rePassword } = form;

    // Check if all fields are filled
    if (!username || !email || !password || !rePassword) {
      toast.error("All fields are required");
      return;
    }

    // Check if passwords match
    if (password !== rePassword) {
      toast.error("Your passwords are not matching!!");
      return;
    }

    // Validate the email domain
    const emailDomain = email.split("@")[1];
    if (emailDomain !== "psgtech.ac.in") {
      toast.error("Only students with a psgtech.ac.in email can sign up.");
      return;
    }

    try {
      setLoading(true);

      // Create user with email and password
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Check if user document already exists in Firestore
      const ref = doc(db, "users", user.uid);
      const userDoc = await getDoc(ref);

      if (!userDoc.exists()) {
        // Create new user document in Firestore
        await setDoc(ref, {
          userId: user.uid,
          username: username,
          email: email,
          userImg: "",
          bio: "",
          created: Date.now(),
        });
      }

      navigate("/");
      toast.success("New Account has been Created");
      setModal(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-3xl">Sign up with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter the email address associated with your account, and we’ll send a
        magic link to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input form={form} setForm={setForm} type="text" title="username" />
        <Input form={form} setForm={setForm} type="email" title="email" />
        <Input form={form} setForm={setForm} type="password" title="password" />
        <Input
          form={form}
          setForm={setForm}
          type="password"
          title="rePassword"
        />
        <button
          className={`px-4 py-1 text-sm rounded-full bg-green-700
        hover:bg-green-800 text-white w-fit mx-auto
        ${loading ? "opacity-50 pointer-events-none" : ""}`}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <button
        onClick={() => setSignReq("")}
        className="mt-5 text-sm text-green-600 hover:text-green-700
      flex items-center mx-auto">
        <MdKeyboardArrowLeft />
        All sign Up Options
      </button>
    </div>
  );
};

export default SignUp;