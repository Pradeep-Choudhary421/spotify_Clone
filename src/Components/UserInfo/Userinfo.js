import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Userinfo = ({ toggleForm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [currentAdd, setCurrentAdd] = useState("");
  const [permanentAdd, setPermanentAdd] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const profileUrl = "http://localhost:5555/user/addProfile";
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios
      .post(profileUrl, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNo: phoneNo,
        currentAdd: currentAdd,
        permanentAdd: permanentAdd,
        gender: gender,
        dob: dob,
        userId: userId,
      })
      .then((res) => {
        toast.success("Profile Updated")
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="outline-none  absolute z-50  px-8  bg-black bg-opacity-50 overflow-hidden flex justify-center py-24 sm:py-44">
        <div className="outline-none  border-2 p-8 rounded-xl z-50 bg-gray-600 flex  ">
          <form action="">
            <div className="outline-none grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-6 justify-items-center items-center">
              <div>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                  className="outline-none py-2 px-2 rounded-xl bg-transparent"
                />
              </div>
              <div>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                  className="outline-none py-2 px-2 rounded-xl bg-transparent"
                />
              </div>

              <div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="outline-none py-2 px-2 rounded-xl bg-transparent"
                />
              </div>

              <div>
                <input
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  type="text"
                  placeholder="Contact No."
                  className="outline-none py-2 px-2 rounded-xl bg-transparent"
                />
              </div>
              <div>
                <input
                  value={currentAdd}
                  onChange={(e) => setCurrentAdd(e.target.value)}
                  type="text"
                  placeholder="Current Address"
                  className="outline-none py-2 px-2 rounded-xl bg-transparent"
                />
              </div>
              <div>
                <input
                  value={permanentAdd}
                  onChange={(e) => setPermanentAdd(e.target.value)}
                  type="text"
                  placeholder="Permanent Address"
                  className="outline-none py-2 px-2 rounded-xl bg-transparent"
                />
              </div>

              <div>
              <select id="countries" value={gender} onChange={(e) => setGender(e.target.value)} className="bg-gray-50  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white ">
                  <option value="">Choose a Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <input
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  type="date"
                  placeholder="Birth Date"
                  className="outline-none py-2 rounded-xl bg-transparent"
                />
              </div>
            </div>
            <div className="outline-none flex justify-end mt-4 gap-4">
              <button
                className="outline-none bg-white hover:bg-transparent text-black hover:text-white duration-500 py-1 px-2 rounded-xl"
                onClick={handleSubmitForm}
              >
                Submit
              </button>{" "}
              <button
                className="outline-none underline text-gray-500 hover:text-white duration-500"
                onClick={toggleForm}
              >
                Skip
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Userinfo;
