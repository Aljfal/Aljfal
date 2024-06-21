import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faEye,
  faPlus,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import axios from "axios";
import ShowGender from "./ShowGender";
import ShowType from "./ShowType";
export default function UserButton({ clas, id, changed, logins }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setlogin] = useState(logins);

  const updatelogin = async () => {
    try {
      const response = await axios.put(`/api/Login/${id}`, login, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsOpen(false);
        changed();
      }
    } catch (error) {
      console.error("Error updating login:", error);
      // Handle error
    }
  };

  const dellogin = async () => {
    try {
      const response = await axios.delete(`/api/Login/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsOpen(false);
        changed();
      }
    } catch (error) {
      console.error("Error deleting login:", error);
      // Handle error
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  }, []);
  const handleInputChangeD = (e) => {
    const { name, value } = e.target;
    setlogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (clas) {
      case "delete":
        dellogin();
        break;
      case "edit":
        updatelogin();
        break;
      default:
    }
  };

  let icon = null;

  switch (clas) {
    case "delete":
      icon = <FontAwesomeIcon icon={faTrash} className="mr" />;
      break;
    case "edit":
      icon = <FontAwesomeIcon icon={faEdit} className="mr" />;
      break;
  }
  const handleChangeG = (selectedIte) => {
    login.Gender = selectedIte;
  };
  const handleChanged = (selectedIte) => {
    login.type = selectedIte;
    console.log(login.type);
  };
  if (clas == "delete") {
    return (
      <>
       <button
          onClick={() => setIsOpen(true)}
          className=" px-10 font-bold text-red-600"
        >
          delete
        </button>
        {isOpen && (
          <div
            className={`custom-popup-overlay ${
              isOpen ? "fade-in" : "fade-out"
            }`}
          >
            <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="custom-popup-innerC rounded-lg bg-white p-12  w-5/4 max-w-3xl ">
                <form onSubmit={handleSubmit}>
                  <div className="relative flex items-center justify-center h-12 w-12 mx-auto mb-6  bg-red-200 rounded-full ">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="custom-close-icon   "
                    >
                      <FontAwesomeIcon icon={faClose} className="iconclose" />
                    </button>
                  </div>
                  <div className="text-center text-2xl font-semibold mb-6">
                    Do you want to delete it?
                  </div>
                  <div className="flex justify-center transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-2xl">
                    <button
                      type="submit"
                      className="w-32 px-6 py-3 text-lg text-white bg-red-600 rounded-md shadow-lg hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white py-4 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
        >
          edit
        </button>
        {isOpen && (
          <div
            className={`custom-popup-overlay ${
              isOpen ? "fade-in" : "fade-out"
            }`}
          >
            <div className="custom-popup-inner">
              <button
                onClick={() => setIsOpen(false)}
                className="custom-close-icon"
              >
                <FontAwesomeIcon icon={faClose} className="iconclose" />
              </button>
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-6 bg-white rounded shadow-md"
              >
                <h2 className="text-l m-4 pb-6 font-bold text-center text-indigo-600">
                  Edit User
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <label
                      htmlFor="username"
                      className="w-1/4  p-2 text-l font-semibold text-gray-700"
                    >
                      Full Name:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={login.username}
                      onChange={handleInputChangeD}
                      className="mt-1 w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Kullanıcı adı ve soyadı girin"
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="mail"
                      className="w-1/4  p-2 text-l font-semibold text-gray-700"
                    >
                      Mail:
                    </label>
                    <input
                      type="email"
                      id="mail"
                      name="Mail"
                      value={login.Mail}
                      onChange={handleInputChangeD}
                      className="mt-1 w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Mail adresi girin"
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="phone"
                      className="w-1/4  p-2 text-l font-semibold text-gray-700"
                    >
                      Phone:
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="PhoneNumber"
                      value={login.PhoneNumber}
                      onChange={handleInputChangeD}
                      className="mt-1 w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Cep telefon numarası girin"
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="Password"
                      className="w-1/4  p-2 text-l font-semibold text-gray-700"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      id="Password"
                      name="Password"
                      value={login.Password}
                      onChange={handleInputChangeD}
                      className="mt-1 w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Kullanıcı adı ve soyadı girin"
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="adress"
                      className="w-1/4  p-2 text-l font-semibold text-gray-700"
                    >
                      Address:
                    </label>
                    <input
                      type="text"
                      id="adress"
                      name="Adress"
                      value={login.Adress}
                      onChange={handleInputChangeD}
                      className="mt-1 w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Adres girin"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-8">
                  <div>
                    <label className="  flex justify-center  text-l font-semibold text-gray-700">
                      Gender:
                    </label>
                    <ShowGender
                      onChange={handleChangeG}
                      className="mt-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="flex justify-center text-l font-semibold text-gray-700">
                      Kind Of User:
                    </label>
                    <ShowType
                      onChange={handleChanged}
                      className="mt-1 w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-center pt-8">
                  <button
                    type="submit"
                    className="hover:shadow-form rounded-full bg-[#211f4e] py-5 px-7 text-center text-l font-semibold text-white outline-none"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
}
