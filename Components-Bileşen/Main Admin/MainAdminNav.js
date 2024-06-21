import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  faHome,
  faBox,
  faUser,
  faCog,
  faSignOut,
  faBars,
  faSearch,
  faBell,
  faChartBar,
  faTags,
  faTrademark,
  faTruck,
  faBuilding,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Fragment } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [activePathname, setActivePathname] = useState("");
  const [activeItem, setActiveItem] = useState("anasayfa");
  const router = useRouter();

  const handleItemClick = (itemName) => {
    setActiveItem(itemName === activeItem ? null : itemName);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  function logouthandler() {
    signOut();
  }

  useEffect(() => {
    const path = router.pathname;
    const parts = path.split("/");
    const lastName = parts[parts.length - 1];
    setActivePathname(lastName);
  }, []);
  return (
    <>
      <Fragment>
        <div className="sidebar bg-gray-200 text-blue-600">
          <ul className="side-menu">
            <li
              className={`${
                activePathname === "Admin" ? "active bg-gray-300" : ""
              } p-2 hover:bg-gray-300  mt-32`}
              onClick={() => handleItemClick("Dashboard")}
            >
              <Link href="/Admin" className="flex items-center">
                <FontAwesomeIcon className="bx" icon={faHome} /> Dashboard
              </Link>
            </li>
            <li
              className={`${
                activePathname === "Users" ? "active bg-gray-300" : ""
              } p-2 hover:bg-gray-300`}
              onClick={() => handleItemClick("Users")}
            >
              <Link href="/Admin/MainAdmin/Users" className="flex items-center">
                <FontAwesomeIcon className="bx" icon={faUser} /> Users
              </Link>
            </li>
            <li
              className={`${
                activePathname === "Resturants" ? "active bg-gray-300" : ""
              } p-2 hover:bg-gray-300`}
              onClick={() => handleItemClick("Resturants")}
            >
              <Link
                href="/Admin/MainAdmin/Resturants"
                className="flex items-center"
              >
                <FontAwesomeIcon className="bx" icon={faBuilding} /> Restaurants
              </Link>
            </li>
       
          </ul>
          <ul className="side-menu">
            {session && (
              <li>
                <Link
                  href="#"
                  className="logout p-2 hover:bg-gray-300"
                  onClick={logouthandler}
                >
                  <FontAwesomeIcon icon={faSignOut} className="bx" />
                  Log out
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="content bg-gray-100 text-blue-600">
          <nav className="bg-gray-300 p-4 flex items-center justify-between">
            <div className="bx bx-menu ml-4 text-blue-600">
              <FontAwesomeIcon icon={faBars} />
            </div>
            <form action="#" className="flex">
              <div className="form-input relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="bg-gray-100 p-2 border border-gray-400 rounded-l"
                />
                <button
                  className="search-btn bg-blue-600 p-2 rounded-r text-white"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faSearch} className="bx" />
                </button>
              </div>
            </form>
            {!session && (
              <Link href="/Login" className="text-blue-600">
                Login
              </Link>
            )}
            {session && (
              <Link href={`/Profile/${session?.user.id} `} className="text-blue-600">
                Profile
              </Link>
            )}
           
            <a href="#" className="profile">
              <img src="/noavatar.png" className="w-10 h-10 rounded-full" />
             
            </a>
            
          </nav>
        </div>
      </Fragment>
    </>
  );
}
