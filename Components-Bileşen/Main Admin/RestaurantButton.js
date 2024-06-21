import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,

  faClose,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

export default function RestaurantButton({ clas, id,changed, Restaurants }) {
  const [isOpen, setIsOpen] = useState(false);
  const [Restaurant, setRestaurant] = useState(Restaurants);

  const updateRestaurant = async () => {
    try {
      const response = await axios.put(`/api/Resturants/${id}`, Restaurant, {
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
      console.error("Error updating Restaurant:", error);
      // Handle error
    }
  };

  const delRestaurant = async () => {
    try {
      const response = await axios.delete(`/api/Resturants/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsOpen(false);
        changed();
      }
    } catch (error) {
      console.error("Error deleting Restaurant:", error);
      // Handle error
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        changed();
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleInputChangeD = (e) => {
    const { name, value } = e.target;
    setRestaurant({
      ...Restaurant,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (clas) {
      case "delete":
        delRestaurant();
        break;
      case "edit":
        updateRestaurant();
        break;
      default:
        break;
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
    default:
      break;
  }

  if (clas === "delete") {
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
            <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 text-black">
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
          className="rounded-xl  bg-blue-600 px-8 py-3 font-bold leading-none text-white"
        >
          edit
        </button>
        {isOpen && (
          <div className="test33 fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
            <div className="custom-popup-inner">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={faClose} className="iconclose" />
                </button>
              </div>
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-6 bg-white rounded shadow-md"
              >
                <h2 className="text-l font-bold text-center text-indigo-600 pb-3 mt-4">
                  Edit Restaurant
                </h2>

                {/* Form fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Name input */}
                  <div>
                    <label
                      htmlFor="Name"
                      className="block font-semibold text-gray-700"
                    >
                      Name:
                    </label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      value={Restaurant?.Name}
                      onChange={handleInputChangeD}
                      className="mt-1 w-full p-5  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                      placeholder="Enter restaurant name"
                    />
                  </div>

                  {/* Owner Name input */}
                  <div>
                    <label
                      htmlFor="Ownername"
                      className="block font-semibold text-gray-700"
                    >
                      Owner Name:
                    </label>
                    <input
                      type="text"
                      id="Ownername"
                      name="Ownername"
                      value={Restaurant?.Ownername}
                      onChange={handleInputChangeD}
                      className="mt-1 w-full p-5  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                      placeholder="Enter owner name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">

                  <div>
                    <label
                      htmlFor="PhoneNumber"
                      className="block font-semibold text-gray-700"
                    >
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      id="PhoneNumber"
                      name="PhoneNumber"
                      value={Restaurant.PhoneNumber}
                      onChange={handleInputChangeD}
                      className="mt-1 w-full p-5  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Adress"
                      className="block font-semibold text-gray-700"
                    >
                      Address:
                    </label>
                    <input
                      type="text"
                      id="Adress"
                      name="Adress"
                      value={Restaurant.Adress}
                      onChange={handleInputChangeD}
                      className="mt-1 w-full p-5  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                      placeholder="Enter address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Address input */}
               
                  <div>
                    <label
                      htmlFor="Adress"
                      className="block font-semibold text-gray-700"
                    >
                      Description/about:
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={Restaurant.description}
                      onChange={handleInputChangeD}
                      className="mt-1 w-full p-5  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
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
