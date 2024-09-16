import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { authActions } from "../store/auth";
import Sidebar from "../components/Profile/Sidebar";
import MobileNav from "../components/Profile/MobileNav";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          {
            headers: { Authorization: `Bearer ${token}`, id: userId },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Handle logout functionality
  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    navigate("/");
  };

  // Render a loader until user data is fetched
  if (!userData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
      <div className="w-full md:w-1/6 mb:h-auto lg:h-screen">
        <Sidebar data={userData} />
        <MobileNav />
      </div>

      <div className="w-full md:w-5/6">
        <div className="container mx-auto p-6">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
            <div className="text-center">
              <img
                src={userData.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-semibold">{userData.username}</h2>
              <p className="text-gray-600">{userData.email}</p>
            </div>

            <div className="mt-6 space-y-4">
              {/* Role-based Links */}
              {role === "user" && (
                <>
                  <Link
                    to="/Profile/favourites"
                    className="block text-center py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Favourites
                  </Link>
                  <Link
                    to="/Profile/orderHistory"
                    className="block text-center py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Order History
                  </Link>
                  <Link
                    to="/Profile/settings"
                    className="block text-center py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Settings
                  </Link>
                </>
              )}

              {role === "admin" && (
                <>
                  <Link
                    to="/admin/orders"
                    className="block text-center py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    All Orders
                  </Link>
                  <Link
                    to="/admin/books"
                    className="block text-center py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    Manage Books
                  </Link>
                </>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-red-700"
              >
                Log Out
                <FaSignOutAlt className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Nested Routes for Profile Sections */}
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
