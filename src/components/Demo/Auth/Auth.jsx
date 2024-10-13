import React, { useState } from "react";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Auth = ({ modal, setModal }) => {
  const [createUser, setCreateUser] = useState(false);
  const [signReq, setSignReq] = useState("");
  const navigate = useNavigate();

  const googleAuth = async () => {
    try {
      const createUser = await signInWithPopup(auth, provider);
      const newUser = createUser.user;

      // Check if the email belongs to the allowed domain
      const emailDomain = newUser.email.split("@")[1];
      if (emailDomain !== "psgtech.ac.in") {
        toast.error("Only students with a psgtech.ac.in email can sign in.");
        auth.signOut(); // Sign the user out if domain is incorrect
        return;
      }

      const ref = doc(db, "users", newUser.uid);
      const userDoc = await getDoc(ref);

      if (!userDoc.exists()) {
        await setDoc(ref, {
          userId: newUser.uid,
          username: newUser.displayName,
          email: newUser.email,
          userImg: newUser.photoURL,
          bio: "",
        });
      }

      navigate("/");
      toast.success("User has been signed in");
      setModal(false);

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal modal={modal} setModal={setModal}>
      <section
        className={`z-50 fixed top-0 bottom-0 left-0 md:left-[10rem]
        overflow-auto right-0 md:right-[10rem] bg-white shadows transition-all duration-500
        ${modal ? "visible opacity-100" : "invisible opacity-0"}`}>
        <button
          onClick={() => setModal(false)}
          className="absolute top-8 right-8 text-2xl hover:opacity-50">
          <LiaTimesSolid />
        </button>

        <div className="flex flex-col justify-center items-center gap-[3rem]">
          {signReq === "" ? (
            <>
              <h2 className="text-2xl pt-[5rem]">
                {createUser ? "Join Penit" : "Welcome Back"}
              </h2>

              <div>
                <Button
                  click={googleAuth}
                  icon={<FcGoogle className="text-xl" />}
                  text={`${createUser ? "Sign Up" : "Sign In"} With Google`}
                />
                <Button
                  icon={<MdFacebook className="text-xl text-blue-600" />}
                  text={`${createUser ? "Sign Up" : "Sign In"} With Facebook`}
                />
                <Button
                  click={() => setSignReq(createUser ? "sign-up" : "sign-in")}
                  icon={<AiOutlineMail className="text-xl" />}
                  text={`${createUser ? "Sign Up" : "Sign In"} With Email`}
                />
              </div>

              <p>
                {createUser ? "Already have an account" : "No Account"}
                <button
                  onClick={() => setCreateUser(!createUser)}
                  className="text-green-600 hover:text-green-700 font-bold ml-1">
                  {createUser ? "Sign In" : "Create one"}
                </button>
              </p>
            </>
          ) : signReq === "sign-in" ? (
            <SignIn setModal={setModal} setSignReq={setSignReq} />
          ) : signReq === "sign-up" ? (
            <SignUp setModal={setModal} setSignReq={setSignReq} />
          ) : null}

          <p className="md:w-[30rem] mx-auto text-center text-sm mb-[3rem]">
            Click “Sign In” to agree to Penit’s Terms of Service and
            acknowledge that Penit’s Privacy Policy applies to you.
          </p>
        </div>
      </section>
    </Modal>
  );
};

export default Auth;

const Button = ({ icon, text, click }) => {
  return (
    <button
      onClick={click}
      className="flex items-center gap-10 sm:w-[20rem] border border-black
          px-3 py-2 rounded-full">
      {icon} {text}
    </button>
  );
};
