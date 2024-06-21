import { useState, useEffect } from "react";
import ShowGender from "./ShowGender";
import ShowType from "./ShowType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default function AddUser({ clas, id, changed }) {
  const initialFormData = {
    username: "",
    Mail: "",
    Password: "",
    PhoneNumber: "",
    Adress: "",
    Gender: "",
    type: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const AddUser = async () => {
    try {
      const response = await axios.post("/api/Users", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsOpen(false);
        changed();
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error adding user:", error);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    AddUser();
  };
  const handleChangeG = (selectedIte) => {
    formData.Gender = selectedIte;
  };
  const handleChanged = (selectedIte) => {
    formData.type = selectedIte;
    console.log(formData.type);
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-3  bg-green-500 hover:bg-blue-600 text-white rounded-full px-8 py-4 transition duration-300 shadow-lg"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Users
      </button>
      {isOpen && (
        <div className="custom-popup-overlay outline-double outline-3 outline-offset-2">
          <div className="bg-gray-600 shadow-lg rounded-lg  mx-auto">
            <div className="flex items-center justify-center p-4">
              <div className="  w-[450px] bg-white ">
                <div className=" flex justify-end ">
                  <button
                    onClick={() => setIsOpen(false)}
                    className=" text-gray-600 hover:text-gray-800 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 p-6 bg-white rounded shadow-md"
                >
                  <h2 className="text-m font-bold text-center text-indigo-600">
                    Add User
                  </h2>

                  <div className="   text-m  font-bold  text-gray-700">
                    <label htmlFor="username" className="mb-3  text-[#07074D]">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="mt-1 w-full p-4  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                      placeholder=" Full Name"
                    />
                  </div>
                  <label htmlFor="mail" className="mb-3  text-[#07074D]">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    id="mail"
                    name="Mail"
                    value={formData.Mail}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-4  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                    placeholder=" Email Addres"
                  />
                  <label htmlFor="phone" className="mb-3  text-[#07074D]">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-4  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                    placeholder=" Phone Number"
                  />
                  <label htmlFor="username" className="mb-3  text-[#07074D]">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="Password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-4  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                    placeholder="Password"
                  />
                  <label htmlFor="adress" className="mb-3  text-[#07074D]">
                    Address Details:
                  </label>
                  <input
                    type="text"
                    id="adress"
                    name="Adress"
                    value={formData.Adress}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-4  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                    placeholder="Address Details"
                  />
                  <div className=" flex justify-between">
                    <div className="  ">
                      <label className="   font-semibold px-16">Gender:</label>
                      <ShowGender
                        onChange={handleChangeG}
                        className=" text-black "
                      />
                    </div>
                    <div className=" ">
                      <label className=" font-semibold  px-16">category:</label>

                      <ShowType
                        onChange={handleChanged}
                        className=" text-black "
                      />
                    </div>
                  </div>

                  <div className=" flex justify-center">
                    <button
                      type="submit"
                      className="  hover:shadow-form rounded-full bg-[#211f4e] py-5 px-7 text-center text-l font-semibold text-white outline-none"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
