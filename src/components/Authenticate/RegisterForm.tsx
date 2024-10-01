import React, { useState } from "react";
import { helveticaBold } from "../../fonts/index";
import CircularProgress from "@mui/material/CircularProgress";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import instance from "@/constants/axios";
import { useUser } from "@/contexts/UserContext";
import { Alert, Snackbar } from "@mui/material";

const RegisterForm = ({ email }: { email: string }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });
  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { login } = useUser();

  const handleSubmit = async () => {
    if (!username || !password || !confirmPassword) {
      setError({
        email: !email ? "Please enter a valid email" : "",
        username: !username ? "Please enter a valid username" : "",
        password: !password ? "Please enter a valid password" : "",
        confirmPassword: !confirmPassword
          ? "Please enter a valid password"
          : "",
      });
      return;
    }

    if (password !== confirmPassword) {
      setError({
        email: "",
        username: "",
        password: "",
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    setIsButtonLoading(true);
    instance
      .post("/auth/register", { username, email, password })
      .then(async (res) => {
        if (res.status == 201) {
          setIsButtonLoading(false);

          await login({ email, password, usingGoogle: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <p className={`text-[20px] ${helveticaBold.className}`}>Register</p>
      <input
        type="text"
        placeholder="Enter your email"
        className={`w-[300px] h-[50px] m-4 p-3 px-5 rounded-md bg-lightBlack text-lightWhite border border-lightWhite outline-none placeholder-lightWhite focus:border-2 ${
          error.email ? "border-red-600" : ""
        }`}
        value={email}
        readOnly={true}
      />
      {error.email && <p className="text-red-500">{error.email}</p>}
      <input
        type="text"
        placeholder="Enter your username"
        className={`w-[300px] h-[50px] m-4 p-3 px-5 rounded-md bg-lightBlack text-lightWhite border border-lightWhite outline-none placeholder-lightWhite focus:border-2 ${
          error.username ? "border-red-600" : ""
        }`}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {error.username && <p className="text-red-500">{error.username}</p>}
      <div className={`relative h-fit flex flex-col items-center`}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-[300px] h-[50px] p-3 m-4 border border-lightWhite px-5 rounded-md transition-all bg-lightBlack text-lightWhite placeholder-lightWhite focus:border-2 ${
            error.password ? "border-red-600" : ""
          }`}
        />
        {error.password && <p className="text-red-500">{error.password}</p>}
        {showPassword ? (
          <FaEye
            className={`absolute right-8 top-8 cursor-pointer hover:scale-105 opacity-100`}
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <FaEyeSlash
            className={`absolute right-8 top-8 cursor-pointer hover:scale-105 opacity-100`}
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
      <div className={`relative h-fit flex flex-col items-center`}>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-[300px] h-[50px] p-3 m-4 border border-lightWhite px-5 rounded-md transition-all bg-lightBlack text-lightWhite placeholder-lightWhite focus:border-2 ${
            error.password ? "border-red-600" : ""
          }`}
        />
        {error.confirmPassword && (
          <p className="text-red-500">{error.confirmPassword}</p>
        )}
        {showConfirmPassword ? (
          <FaEye
            className={`absolute right-8 top-8 cursor-pointer hover:scale-105 opacity-100`}
            onClick={() => setShowConfirmPassword(false)}
          />
        ) : (
          <FaEyeSlash
            className={`absolute right-8 top-8 cursor-pointer hover:scale-105 opacity-100`}
            onClick={() => setShowConfirmPassword(true)}
          />
        )}
      </div>
      <button
        className="w-[290px] h-[50px] m-4 p-2 rounded-md transition-all bg-lightWhite text-black hover:-translate-y-2 "
        onClick={handleSubmit}
      >
        {isButtonLoading ? (
          <CircularProgress
            size={24}
            color="inherit"
            className="mt-1 text-black"
          />
        ) : (
          "Create an Account"
        )}
      </button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ open: false, type: "success", message: "" })}
      >
        <Alert
          onClose={() =>
            setAlert({ open: false, type: "success", message: "" })
          }
          severity={alert.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterForm;
