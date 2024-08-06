import axios from "axios";
import React, { useState } from "react";
import { FaSpotify } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginUrl = "http://localhost:5555/user/login";

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(loginUrl, {
        email: email,
        password: password,
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userId", res.data.data[0][0].id);
        sessionStorage.setItem("userName", res.data.data[0][0].name);
        toast.success("Logged In");
        navigate("home");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Invalid Password");
        } else {
          toast.error("Email Not Registered");
        }
      });
  };
  return (
    <>
      <div className="flex justify-center justify-items-center items-center overflow-hidden h-screen">
        <div>
          <div className="flex justify-center py-2 text-4xl">
            <FaSpotify />
          </div>
          <div className="text-2xl flex justify-center py-2">
            Login To Spotify
          </div>
          <div className="px-4">
            <form action="" onSubmit={handleLogin}>
              <div className="py-2 flex flex-col gap-2">
                <div>Email</div>
                <input
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" bg-transparent border-2 rounded-[3px] py-2 px-8 border-gray-400"
                />
              </div>
              <div className="py-2 flex flex-col gap-2">
                <div>Password</div>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className=" bg-transparent border-2 rounded-[3px] py-2 px-8 border-gray-400"
                />
              </div>
              <div className="flex justify-center bg-green-500 hover:scale-110 duration-300 rounded-xl py-2 text-black mt-6">
                <button className="w-full" type="submit">
                  Login
                </button>
              </div>
              <div className="flex justify-center py-6 ">
                <h2 className="underline cursor-pointer">Reset Password</h2>
              </div>
              <div className="border-t-[1px] pt-8">
                <h2 className="text-gray-500">
                  Don't have an account ?{" "}
                  <span className="text-white hover:text-green-500 underline cursor-pointer">
                    <Link to="/signUp">Sign up for Spotify</Link>
                  </span>
                </h2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
