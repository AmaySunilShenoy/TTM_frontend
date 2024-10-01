import { helveticaBold } from "@/fonts";
import instance from "@/constants/axios";
import { useUser } from "@/contexts/UserContext";
import { CircularProgress } from "@mui/material";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = ({
  setShowRegister,
  email,
  setEmail,
}: {
  setShowRegister: (value: boolean) => void;
  email: string;
  setEmail: (value: string) => void;
}) => {
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);
  const [showInput, setShowInput] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Continue with Email");
  const [emailError, setEmailError] = React.useState(false);
  const { login } = useUser();

  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.exec(email)) {
      setEmailError(true);
      return;
    }
    setIsButtonLoading(true);
    if (!showInput) {
      instance
        .post("/auth/checkuser", { email, usingGoogle: false })
        .then((res) => {
          if (res.data.user) {
            setShowInput(true);
            setButtonText("Login");
            setIsButtonLoading(false);
          } else {
            setShowRegister(true);
            setIsButtonLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await login({ email, password, usingGoogle: false });
    }
  };

  return (
    <>
      <p className={`text-[20px] ${helveticaBold.className}`}>
        Login or Create an Account
      </p>
      <input
        type="text"
        placeholder="Enter your email"
        className={`w-[300px] h-[50px] m-4 p-3 px-5 rounded-md bg-lightBlack text-lightWhite border border-lightWhite outline-none placeholder-lightWhite focus:border-2 ${
          emailError ? "border-red-500" : ""
        }`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        readOnly={showInput}
      />
      {emailError && <p className="text-red-500">Please enter a valid email</p>}
      <div className={`relative ${showInput ? "h-fit" : "h-0"}`}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-[300px] ${
            showInput ? "h-[50px] p-3 m-4 border border-lightWhite" : "h-0"
          }  px-5 rounded-md transition-all bg-lightBlack text-lightWhite placeholder-lightWhite focus:border-2`}
        />
        {showPassword ? (
          <FaEye
            className={`absolute right-8 top-8 cursor-pointer hover:scale-105 ${
              showInput ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <FaEyeSlash
            className={`absolute right-8 top-8 cursor-pointer hover:scale-105 ${
              showInput ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
      <button
        className="w-[290px] h-[50px] m-4 p-2 rounded-md transition-all bg-lightWhite text-black hover:-translate-y-2 "
        onClick={handleSubmit}
      >
        {!isButtonLoading ? (
          buttonText
        ) : (
          <CircularProgress
            size={24}
            color="inherit"
            className="mt-1 text-black"
          />
        )}
      </button>
    </>
  );
};

export default LoginForm;
