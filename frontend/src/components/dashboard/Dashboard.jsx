// import React from 'react';
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import myimg from "../../assets/image.jpeg";
import profile1 from "../../assets/profile1.jpg";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [isClockedIn, setIsClockedIn] = useState(false);
  useEffect(() => {
    let timer;
    if (isClockedIn) {
      timer = setInterval(() => {
        updateCurrentTime();
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isClockedIn]);
  const updateCurrentTime = () => {
    setCurrentTime((prevTime) => {
      const [hours, minutes, seconds] = prevTime.split(":").map(Number);
      const newSeconds = (seconds + 1) % 60;
      const newMinutes = minutes + Math.floor((seconds + 1) / 60);
      const newHours = hours + Math.floor(newMinutes / 60);
      return `${String(newHours).padStart(2, "0")}:${String(
        newMinutes % 60
      ).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
    });
  };

  const handleClockInOut = () => {
    setIsClockedIn(!isClockedIn);
    if (isClockedIn) {
      setCurrentTime("00:00:00");
    }
  };

  return (
    <>
      <div className="flex flex-row w-[100%]">
        {/* left part */}
        <div className="w-[70%] flex flex-col gap-5 pl-5 pt-5 ">
          <div className="w-[100%] flex flex-row justify-start gap-10 text-white ">
            <div className="bg-lime-500 p-8 w-[15%]  rounded hover:rounded-lg  ">
              casual
            </div>
            <div className="bg-pink-800 p-8 w-[15%] rounded hover:rounded-lg">
              paternity
            </div>
            <div className="bg-amber-900 p-8 w-[15%] rounded hover:rounded-lg">
              earned
            </div>
            <div className="bg-cyan-500 p-8 w-[15%] rounded hover:rounded-lg">
              maternity
            </div>
            <div className="bg-sky-800 p-8 w-[15%] rounded hover:rounded-lg">
              sick
            </div>
          </div>
          <div className="w-[95%] h-[99px] flex flex-row justify-evenly text-slate-700 bg-white border-slate-300 border-2 rounded-lg">
            <div className="p-8 h-24 rounded-lg">
              <p>Total</p>
              <p>20 Days</p>
            </div>
            <div className="p-8 h-24 rounded-lg">
              <p>Allocated</p>
              <p>2 Days</p>
            </div>
            <div className="p-8 h-24 rounded-lg">
              <p>Planned</p>
              <p>9 Days</p>
            </div>
            <div className="p-8 h-24 rounded-lg">
              <p>Token</p>
              <p>3 Days</p>
            </div>
            <div className="p-8 h-24 rounded-lg">
              <p>Balance</p>
              <p>12 Days</p>
            </div>
          </div>
          <div className="h-[248px] w-[95%] bg-white shadow-lg  border-slate-300 border-2 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Announcements{" "}
                <span className="text-sm text-pink-600">(1 New)</span>
              </h2>
            </div>
          </div>
          <div className="flex w-[90%] justify-around ">
            <div className="w-[45%] bg-white shadow-lg  border-slate-300 border-2 rounded-lg p-6">
              <div className="flex flex-col justify-evenly">
                <h2 className="text-lg font-semibold text-gray-800">
                  Absent Today(3){" "}
                </h2>
                <h3>Vimal</h3>
                <h3>Vimal</h3>
                <h3>Vimal</h3>
                <h3>Vimal</h3>
                <h3>Vimal</h3>
              </div>
            </div>
            <div className="w-[45%] bg-white shadow-lg  border-slate-300 border-2 rounded-lg p-6">
              <div className="">
                <h2 className="text-lg font-semibold text-gray-800">
                  On Leave(3){" "}
                </h2>
                <h3>Vimal</h3>
                <h3>Vimal</h3>
                <h3>Vimal</h3>
                <h3>Vimal</h3>
                <h3>Vimal</h3>
              </div>
            </div>
          </div>
        </div>

        {/* right part */}
        <div className="w-[30%] flex flex-col gap-1 pt-5">
          {/* profile part */}
          <div className="bg-white rounded-lg shadow-lg text-center mx-auto py-8 w-[80%]">
            {/* <div className="mb-4">
              <img
                src={myimg}
                alt="Profile Picture"
                className="w-32 h-32 mx-auto rounded-full border-4 border-gray-200"
              />
            </div>
            <div className="mb-4">
              <h1 className="text-xl font-bold">Harshita Pathakamuri</h1>
              <p className="text-gray-500">Junior Software Engineer</p>
            </div> */}
            <div className="mb-4">
              {" "}
              <img
                src={user?.profile?.picture || myimg}
                alt="Profile Picture"
                className="w-32 h-32 mx-auto rounded-full border-4 border-gray-200"
              />{" "}
            </div>{" "}
            <div className="mb-4">
              {" "}
              <h1 className="text-xl font-bold">
                {user?.profile?.displayName || "User Name"}
                <p className="text-gray-500">Junior Software Engineer</p>
              </h1>{" "}
             
            </div>
            <div className="flex justify-center gap-8 mb-6">
              <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300 w-32">
                <p className="text-green-600 font-semibold">Current Time</p>
                <p className="text-lg font-bold">{currentTime}</p>{" "}
              </div>
              <div className="bg-red-100 p-4 rounded-lg border-2 border-red-300 w-32">
                <p className="text-red-600 font-semibold">Break Time</p>
                <p className="text-lg font-bold">00:00:00</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <select className="border border-gray-300 p-2 rounded-md">
                <option>Work From Home</option>
                <option>Work From Office</option>
              </select>
              <button
                className="bg-green-500 text-white px-6
                             py-2 rounded-md hover:bg-green-600 transition"
                onClick={handleClockInOut}
              >
                {" "}
                {isClockedIn ? "CLOCK OUT" : "CLOCK IN"}
              </button>
            </div>
          </div>

          {/* calendar part */}
          <div class="bg-white rounded-lg shadow-lg text-center mx-auto py-8 w-[80%]">
            <div class="flex justify-between items-center mb-4">
              <button class="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 16.293a1 1 0 010-1.414L15.586 12H6a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <span class="text-lg font-semibold">November 2023</span>
              <button class="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.707 3.707a1 1 0 010 1.414L4.414 8H14a1 1 0 110 2H4.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-7 gap-2 text-center mb-4">
              <span class="text-red-500">Mo</span>
              <span class="text-red-500">Tu</span>
              <span class="text-red-500">We</span>
              <span class="text-red-500">Th</span>
              <span class="text-red-500">Fr</span>
              <span class="text-red-500">Sa</span>
              <span class="text-red-500">Su</span>

              <span class="p-2">30</span>
              <span class="p-2">31</span>
              <span class="p-2 ">1</span>
              <span class="p-2">2</span>
              <span class="p-2">3</span>
              <span class="p-2">4</span>
              <span class="p-2">5</span>

              <span class="p-2 rounded-lg ">6</span>
              <span class="p-2">7</span>
              <span class="p-2">8</span>
              <span class="p-2">9</span>
              <span class="p-2">10</span>
              <span class="p-2">11</span>
              <span class="p-2">12</span>

              <span class="p-2">13</span>
              <span class="p-2">14</span>
              <span class="p-2 ">15</span>
              <span class="p-2">16</span>
              <span class="p-2">17</span>
              <span class="p-2">18</span>
              <span class="p-2">19</span>

              <span class="p-2">20</span>
              <span class="p-2">21</span>
              <span class="p-2 rounded-lg ">22</span>
              <span class="p-2 rounded-lg">23</span>
              <span class="p-2 rounded-lg ">24</span>
              <span class="p-2">25</span>
              <span class="p-2">26</span>

              <span class="p-2">27</span>
              <span class="p-2">28</span>
              <span class="p-2">29</span>
              <span class="p-2">30</span>
              <span class="text-gray-400">1</span>
              <span class="text-gray-400">2</span>
              <span class="text-gray-400">3</span>
            </div>

            <div class="flex justify-around mt-4">
              <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-green-300 inline-block mr-2"></span>
                <span class="text-sm">Holidays</span>
              </div>
              <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-blue-300 inline-block mr-2"></span>
                <span class="text-sm">Absent</span>
              </div>
            </div>
          </div>

          <div className=" text-center mx-auto flex flex-col justify-evenly py-2 w-[80%]  h-[30vh] ">
            <div className=" flex justify-center items-center   ">
              <select className="bg-indigo-200 rounded-lg p-4 flex justify-between items-center cursor-pointer w-[80%]">
                <option>Upcoming Holidays</option>
                <option>Work From Office</option>
              </select>
            </div>
            <div className="flex justify-center items-center ">
              <select className="bg-indigo-200 rounded-lg p-4 flex justify-between items-center cursor-pointer w-[80%]">
                <option>Upcoming Anniversary</option>
                <option>Work From Office</option>
              </select>
            </div>
            <div className="flex justify-center items-center ">
              <select className="bg-indigo-200 rounded-lg p-4 flex justify-between items-center cursor-pointer w-[80%]">
                <option>Upcoming Birthdays</option>
                <option>Work From Office</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
