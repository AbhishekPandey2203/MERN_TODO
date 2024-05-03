import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";
import { getUser } from "./apiCalls/user";
import LoggedInHome from "./pages/LoggedInHome";
import UnProtectedRoutes from "./components/UnProtectedRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CreateTodo from "./pages/CreateTodo";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import ViewTodo from "./pages/ViewTodo";
import UpdateTodo from "./pages/UpdateTodo";

function App() {
  //
  const { user, setUser} = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUser();

        // Check if res is not undefined before accessing its properties
        if (res && res.data && res.data.user) {
          setUser(res.data.user);
        } else {
          // Handle the case when res is undefined or doesn't contain expected data
          throw new Error("Invalid response received from getUser");
        }
      } catch (error) {
        // Handle any errors that occur during the fetching process
        console.error("Error fetching user:", error.message);
        // Optionally, you can set a default user state or handle the error in another way
      }
    };
  });
  return (
    <div className="App bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Navbar user={user}/>
      <Routes>
        <Route path="/" element={user._id ? <LoggedInHome /> : <Home />} />
        <Route
          path="/user/register"
          element={
            <UnProtectedRoutes loggedIn={user._id ? true : false}>
              <Register />
            </UnProtectedRoutes>
          }
        />
        <Route
          path="/user/login"
          element={
            <UnProtectedRoutes loggedIn={user._id ? true : false}>
              <Login />
            </UnProtectedRoutes>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <Profile />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/todo/create"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <CreateTodo />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/user/update"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <UpdateProfile />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/user/updatepassword"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <UpdatePassword />
            </ProtectedRoutes>
          }
        />

<Route
          path="/todo/view/:id"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <ViewTodo />
            </ProtectedRoutes>
          }
        />



<Route
          path="/todo/update/:id"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
            <UpdateTodo/>
            </ProtectedRoutes>
          }
        />




      </Routes>
    </div>
  );
}

export default App;
