import React, { useMemo } from "react";
import GoogleIcon from "../../assets/icons/google-color-icon";
import FacebookIcon from "../../assets/icons/facebook-icon";
import GithubIcon from "../../assets/icons/github-icon";
import {
  FACEBOOK_LOGIN_URL,
  GITHUB_LOGIN_URL,
  GOOGLE_LOGIN_URL,
} from "../../config/socialLink";
import { Button } from "@mui/material";

const SocialLogin = () => {
  const loginItems = useMemo(() => {
    return [
      {
        name: "Google",
        icon: <GoogleIcon />,
        url: GOOGLE_LOGIN_URL,
      },
      {
        name: "Facebook",
        icon: <FacebookIcon />,
        url: FACEBOOK_LOGIN_URL,
      },
      {
        name: "Github",
        icon: <GithubIcon />,
        url: GITHUB_LOGIN_URL,
      },
    ];
  }, []);
  return (
    <div className="flex flex-col items-center gap-5 justify-center h-[90%]">
      {loginItems.map((item) => (
        <Button
          href={item.url}
          key={item.name}
          style={{
            backgroundColor: "#fff",
            color: "rgb(71 85 105)",
          }}
          className="btn w-[240px] border-gray-300 text-slate-500"
          startIcon={item.icon}
        >
          <span className="normal-case">Login with {item.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default SocialLogin;
