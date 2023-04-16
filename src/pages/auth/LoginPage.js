import React from "react";
import logo from "../../assets/images/login-page.png";
// import SocialLogin from "../../features/auth/SocialLogin";
import { Link } from "react-router-dom";
import LoginForm from "../../features/auth/LoginForm";

// D7FBE2
const LoginPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col p-[60px] pb-0 justify-between">
        <div className="ml-15 text-center my-2 mt-5">
          <h2 className="text-5xl font-semibold text-slate-900 ">
            Welcome back.
          </h2>

          {/* <p className="my-5">
            Sign in to access your manage blog, follow and seeing your reports
          </p> */}
        </div>
        <img src={logo} alt="logo" className="w-[70%] mx-auto" />
      </div>
      <div className="bg-[#D7FBE2] w-[35%]">
        <LoginForm />
        <div className="text-center text-slate-400">
          <Link to={"/"} className="underline decoration-solid">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
