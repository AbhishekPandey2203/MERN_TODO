import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { deleteUser, logout } from "../apiCalls/user";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    const response = await logout();
    if (response.status === 200) {
      setUser(null);
      navigate("/");
    } else {
      alert(response.response.data.msg);
    }
  };

  const deleteAccountHandler = async (e) => {
    if (window.confirm("Are you sure want to delete your account ?")) {
      const response = await deleteUser();
      if (response.status === 200) {
        alert("User Deleted Successfully");
        setUser(null);
        navigate("/user/login");
      } else {
        alert(response.response.data.msg);
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">User-Profile</h1>
      <div className="mt-3">
        <h2 className="text-2xl">Name: {user.name}</h2>
        <h2 className="text-2xl">Email: {user.email}</h2>
        <h2 className="text-2xl">Age: {user.age}</h2>
      </div>
      <div className="mt-3">
        <button
          onClick={() => navigate("/user/update")}
          className=" my-2 bg-yellow-600 text-white w-full py-2 rounded"
        >
          Update Profile
        </button>

        <button
          onClick={() => navigate("/user/updatepassword")}
          className=" my-2 bg-blue-600 text-white w-full py-2 rounded"
        >
          Update Password
        </button>

        <button
          onClick={logoutHandler}
          className=" my-2 bg-red-400 text-white w-full py-2 rounded"
        >
          Logout
        </button>

        <button
          onClick={deleteAccountHandler}
          className=" my-2 bg-red-700 text-white w-full py-2 rounded"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
