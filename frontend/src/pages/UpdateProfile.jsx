import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

import { updateUser } from "../apiCalls/user";

const UpdateProfile = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      age,
    };

    const response = await updateUser(data);
    if (response.status === 201) {
      alert("User Updated Successfully");
      setUser(response.data.user);
      navigate("/user/profile");
    } else {
      alert(response.response.data.msg);
    }
  };

  return (
    <div className="w-1/4 m-auto text-center">
      <h1 className="text-3xl my-3 font-bold"> Update Profile </h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter Name.."
            className="focus:outline-none border-none p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Enter Email.."
            className="focus:outline-none border-none p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            placeholder="Enter Age.."
            className="focus:outline-none border-none p-2 rounded w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
