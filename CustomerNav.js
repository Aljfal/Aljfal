import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  faHome,
  faUsers,
  faCog,
  faSignOut,
  faBars,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Fragment } from "react";

export default function CustomerNav({ id }) {
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
        <div className="sidebar bg-gray-100 ">
          <ul className="side-menu text-blue-600 ">
            <li
              className={`${
                activePathname === "AdminResturant" ? "active bg-gray-200" : ""
              } p-2 hover:bg-gray-200 mt-32`}
              onClick={() => handleItemClick("anasayfa")}
            >
              <Link
                href={`/Admin/Customer/${id}`}
                className="flex items-center"
              >
                <FontAwesomeIcon className="bx" icon={faHome} /> Dashboard
              </Link>
            </li>
          </ul>
          <ul className="side-menu text-blue-600">
            {session && (
              <li>
                <Link href="#" className="logout p-2 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faSignOut} className="bx" />
                  Log out
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="content bg-gray-100">
          <nav className="bg-gray-200 p-4 flex items-center justify-between">
            <div className="bx bx-menu ml-4">
              <FontAwesomeIcon icon={faBars} />
            </div>
            <form action="#" className="flex">
              <div className="form-input relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="bg-gray-100 p-2 border border-gray-300 rounded-l"
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
              <Link
                href={`/Profile/${session?.user.id} `}
                className="text-blue-600"
              >
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
