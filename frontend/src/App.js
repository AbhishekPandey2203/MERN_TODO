import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { useContext, useEffect, useState } from "react";
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
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true); // to prevent rendering routes before user is fetched

  const fetchData = async () => {
    try {
      const res = await getUser();
      if (res?.data?.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error.message);
      setUser(null);
    } finally {
      setLoading(false); // loading is complete
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>; // prevent crashes on first load

  return (
    <div>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={user?._id ? <LoggedInHome /> : <Home />} />
        <Route
          path="/user/register"
          element={
            <UnProtectedRoutes loggedIn={!!user?._id}>
              <Register />
            </UnProtectedRoutes>
          }
        />
        <Route
          path="/user/login"
          element={
            <UnProtectedRoutes loggedIn={!!user?._id}>
              <Login />
            </UnProtectedRoutes>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoutes loggedIn={!!user?._id}>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/todo/create"
          element={
            <ProtectedRoutes loggedIn={!!user?._id}>
              <CreateTodo />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/update"
          element={
            <ProtectedRoutes loggedIn={!!user?._id}>
              <UpdateProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user/updatepassword"
          element={
            <ProtectedRoutes loggedIn={!!user?._id}>
              <UpdatePassword />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/todo/view/:id"
          element={
            <ProtectedRoutes loggedIn={!!user?._id}>
              <ViewTodo />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/todo/update/:id"
          element={
            <ProtectedRoutes loggedIn={!!user?._id}>
              <UpdateTodo />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
