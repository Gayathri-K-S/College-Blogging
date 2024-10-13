import React, { useState } from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setSignReq }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    // Check if fields are empty
    if (!email || !password) {
      toast.error("All fields are required!!!");
      return;
    }

    // Validate the email domain
    const emailDomain = email.split("@")[1];
    if (emailDomain !== "psgtech.ac.in") {
      toast.error("Only students with a psgtech.ac.in email can sign in.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("User has been logged in");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-3xl">Sign in with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter the email address associated with your account, and we’ll send a
        magic link to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input form={form} setForm={setForm} type="email" title="email" />
        <Input form={form} setForm={setForm} type="password" title="password" />
        <button
          className={`px-4 py-1 text-sm rounded-full bg-green-700
        hover:bg-green-800 text-white w-fit mx-auto
        ${loading ? "opacity-50 pointer-events-none" : ""}`}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <button
        onClick={() => setSignReq("")}
        className="mt-5 text-sm text-green-600 hover:text-green-700
      flex items-center mx-auto">
        <MdKeyboardArrowLeft />
        All sign In Options
      </button>
    </div>
  );
};

export default SignIn;