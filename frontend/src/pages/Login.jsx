import { useContext } from "react";
import React from "react";
import loginImg1 from "../assets/loginimg1.svg";
import loginImg2 from "../assets/loginimg2.svg";
import loginImg3 from "../assets/loginimg3.svg";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";


function Login() {
//   const { login } = useContext(AuthContext);

//   const loginWithGoogle = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/auth/google");
//       window.location.href = response.data.url;
//     } catch (error) {
//       console.error("Error initiating Google OAuth:", error);
//     }
//   };

// const login = () => {
//   window.location.href = 'http://localhost:3000/auth/google';
// };

const { login } = useContext(AuthContext);

  return (
    <div className="relative flex justify-center  h-[100vh]">
      <div className="absolute z-[-10] w-full flex justify-between top-0">
        <img className="w-[340px] h-[320px]" src={loginImg1} alt="" />
      </div>

      {/* login div */}
      <div className="flex flex-col ">
        <h1 className="text-[50px]  font-bold text-center text-[#1F41A9] mt-16">
          BLUE SPACE
        </h1>
        <div className="w-[354px] h-[400px] flex flex-col gap-4">
          <h1 className="font-bold text-[40px] text-[#264ECA] text-center mt-14">
            Login
          </h1>
          <p className="w-full font-bold text-[16px] text-center text-[#264ECA]">
            Please enter your Login and your Password
          </p>

          <div className="border-2 rounded-[15px] bg-gray-600">
            <button
              className="w-full p-2 text-white font-bold text-[14px]"
              onClick={login}
            >
              Sign-in with Google
            </button>
          </div>
        </div>
      </div>

      <div className="absolute z-[-10] flex justify-between items-end bottom-0 w-full">
        <img className="w-[228px] h-[228px] " src={loginImg2} alt="" />
        <img className="w-[520px] h-[509px]" src={loginImg3} alt="" />
      </div>
    </div>
  );
}

export default Login;
