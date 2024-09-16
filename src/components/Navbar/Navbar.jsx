import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/Profile",
    },
    {
      title: "Admin Profile",
      link: "/Profile",
    },
  ];

  // After login, cart and profile shown; otherwise, no
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role)
  if (!isLoggedIn) {
    links.splice(2, 2);
  }
  if(isLoggedIn == true && role === "user"){
    links.splice(4, 1);
  }
  if(isLoggedIn == true && role === "admin"){
    links.splice(3, 1);
  }

  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  return (
    <>
      <nav className="relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item) => (
              <div className="flex items-center" key={item.link}>
                {item.title === "Profile" || item.title === "Admin Profile" ? (
                  <Link
                    to={item.link}
                    className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Link
                    to={item.link}
                    className="hover:text-blue-500 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="hidden md:flex gap-4">
            {!isLoggedIn && (
              <>
                <Link
                  to="/LogIn"
                  className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/SignUp"
                  className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  Sign-Up
                </Link>
              </>
            )}
          </div>
          {/* Toggle button for mobile navigation */}
          <button
            className="text-white text-2xl hover:text-zinc-400 md:hidden"
            onClick={() => setIsMobileNavVisible(!isMobileNavVisible)}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      {/* Mobile menu (visible on smaller screens) */}
      <div
        className={`${
          isMobileNavVisible ? "block" : "hidden"
        } bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item) => (
          <Link
            to={item.link}
            className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
            key={item.link}
            onClick={() => setIsMobileNavVisible(false)} // Close menu when a link is clicked
          >
            {item.title}
          </Link>
        ))}
        {!isLoggedIn && (
          <>
            <Link
              to="/LogIn"
              className="px-8 py-2 text-3xl font-semibold mb-8 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={() => setIsMobileNavVisible(false)}
            >
              Login
            </Link>
            <Link
              to="/SignUp"
              className="px-8 py-2 text-3xl font-semibold mb-8 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={() => setIsMobileNavVisible(false)}
            >
              Sign-Up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
