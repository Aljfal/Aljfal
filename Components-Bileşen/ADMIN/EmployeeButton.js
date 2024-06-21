import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faEye,
  faPlus,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ShowType from "./ShowType";

export default function EmployeeButton({ clas, changed, Employees, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [Employee, setEmployee] = useState(Employees);
  const updateEmployee = async () => {
    try {
      const response = await axios.put(`/api/Employee/${id}`, Employee, {
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
      console.error("Error updating Employee:", error);
      // Handle error
    }
  };

  const delEmployee = async () => {
    try {
      const response = await axios.delete(`/api/Employee/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsOpen(false);
        changed();
      }
    } catch (error) {
      console.error("Error deleting Employee:", error);
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
    setEmployee(Employees);
  }, [Employees]);
  const handleInputChangeD = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...Employee,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (clas) {
      case "delete":
        await delEmployee();
        break;
      case "edit":
        await updateEmployee();
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

  const handleChanged = (selectedIte) => {
    Employee.type = selectedIte;
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
                  <div className="text-center text-2xl font-semibold mb-6 ">
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
            <div className="custom-popup-inner bg-white rounded shadow-lg p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="custom-close-icon text-gray-600 hover:text-gray-800"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
              <form onSubmit={handleSubmit} className="space-y-5 mx-3 my-6">
                <h2 className="text-4xl font-bold text-center text-indigo-600 mx-5">
                  Employee
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {/* Employee Name Input */}
                  <div>
                    <label
                      htmlFor="Name"
                      className="block text-2xl font-semibold text-gray-700"
                    >
                      Employee Name:
                    </label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      value={Employee?.Name}
                      onChange={handleInputChangeD}
                      className="mt-1/2 w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Enter employee name"
                    />
                  </div>

                  <div>
                    <label className=" text-2xl font-semibold text-gray-700">
                      Employee Type:
                    </label>

                    <ShowType onChange={handleChanged} sele={Employee.type} />
                  </div>
                  <div>
                    <label
                      htmlFor="Name"
                      className="block text-2xl font-semibold text-gray-700"
                    >
                      Description:
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={Employee?.description}
                      onChange={handleInputChangeD}
                      className="mt-1/2 w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Description"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  {" "}
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="flex justify-center bg-blue-500 text-white py-4 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
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
