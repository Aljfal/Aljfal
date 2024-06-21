import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function MainNav() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [User, setUser] = useState("");

  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  const getData = async () => {
    if (!session) return;
    try {
      // Make a GET request to the API
      const response = await axios.get(`/api/Login/${session?.user.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [session]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <>
      <header id="home" className="navbar-fixed-top">
        <div className="container">
          <div className="row">
            <nav className="navbar navbar-default">
              <div className="container-fluid ">
                <a className="navbar-brand our_logo mt-6  " href="#">
                  <img src="logo-no-background.png" className="ml-6" alt="" />
                </a>
                <ul className="nav navbar-nav navbar-right custom-nav">
                  <li>
                    <a href="#slider">Home</a>
                  </li>
                  <li>
                    <a href="#abouts">About</a>
                  </li>
                  <li>
                    <a href="#features">Special</a>
                  </li>
                  <li>
                    <a href="#portfolio">Meals</a>
                  </li>
                  <li>
                    <a href="#ourPakeg">Resturants</a>
                  </li>

                  {session?.user.name ? (
                    <>
                      <li>
                        <ul>
                          <li
                            ref={dropdownRef}
                            className="relative text-gray-600 mt-6 mr-4"
                          >
                            <Link
                              href="#"
                              onClick={handleDropdownToggle}
                              className="cursor-pointer"
                            >
                              {session?.user.name}
                            </Link>
                            {dropdownOpen && (
                              <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                {User?.type === "MainAdmin" ? (
                                  <Link
                                    href="/Admin"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                  >
                                    Dashboard
                                  </Link>
                                ) : User?.type === "Restaurant owner" ? (
                                  <Link
                                    href={`/Admin/${User.resturant}/AdminResturant`}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                  >
                                    Dashboard
                                  </Link>
                                ) : (
                                  <Link
                                    href={`/Admin/Customer/${User._id}`}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                  >
                                    Dashboard
                                  </Link>
                                )}

                                <Link
                                  href={`Profile/${session.user.id}`}
                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                  Profile
                                </Link>
                                <Link
                                  href="#"
                                  onClick={() => signOut()}
                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                  <FontAwesomeIcon
                                    icon={faSignOut}
                                    className="mr-2"
                                  />
                                  Log out
                                </Link>
                              </div>
                            )}
                          </li>
                        </ul>
                      </li>
                    </>
                  ) : (
                    <li>
                      <a href="Login">Login</a>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <section id="slider" className="slider">
        <div className="slider_overlay">
          <div className="container">
            <div className="row">
              <div className="main_slider text-center">
                <div className="col-md-12">
                  <div
                    className="main_slider_content wow zoomIn"
                    data-wow-duration="1s"
                  >
                    <h1>DINEWISE</h1>
                    <p>
                      DINEWISE: Your go-to platform for honest, insightful, and
                      comprehensive restaurant reviews, helping you make the
                      best dining choices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
