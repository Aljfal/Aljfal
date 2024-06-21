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

export default function MealsButton({ clas, changed, Meals, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [Meal, setMeal] = useState(Meals);

  const updateMeal = async () => {
    try {
      const response = await axios.put(`/api/Meals/${id}`, Meal, {
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
      console.error("Error updating Meal:", error);
      // Handle error
    }
  };

  const delMeal = async () => {
    await delPhoto();
    try {
      const response = await axios.delete(`/api/Meals/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsOpen(false);
        changed();
      }
    } catch (error) {
      console.error("Error deleting Meal:", error);
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
    setMeal(Meals);
  }, [Meals]);
  const handleInputChangeD = (e) => {
    const { name, value } = e.target;
    setMeal({
      ...Meal,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (clas) {
      case "delete":
        delMeal();
        break;
      case "edit":
        updateMeal();
        break;
      default:
    }
  };
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    setFile(selectedFile);
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
  const delPhoto = async () => {
    const filename = Meal.image;

    // Define the API endpoint URL
    const apiUrl = `/api/imagedelete/${filename}`;

    try {
      // Make the DELETE request
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          // Properly concatenate Bearer prefix with the token
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      // Check if the response is successful
      if (response.ok) {
        // You can add success handling logic here, if needed
        console.log("Photo deleted successfully.");
      } else {
        // Handle response errors
        console.error("Failed to delete photo:", response.statusText);
      }
    } catch (error) {
      // Handle fetch request errors
      console.error("Error deleting photo:", error);
      // You can add more specific error handling if necessary
    }
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
                      <FontAwesomeIcon
                        icon={faClose}
                        className="iconclose text-black hover:text-gray-300 transition-all"
                      />
                    </button>
                  </div>
                  <div className="text-center text-2xl font-semibold mb-6 text-black">
                    Do you want to delete it?
                  </div>
                  <div className="flex justify-center transform transition-transform  ease-in-out  hover:shadow-2xl">
                    <button
                      type="submit"
                      className="w-32 px-6 py-3 text-lg text-white bg-red-600 rounded-md shadow-lg hover:bg-red-900 transition "
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
          className="bg-blue-500 text-white py-4 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition "
        >
          edit
        </button>
        {isOpen && (
          <div
            className={`custom-popup-overlay ${
              isOpen ? "fade-in" : "fade-out"
            }`}
          >
            <div className="custom-popup-innerD bg-white rounded-lg shadow-lg ">
              <div className="relative bg-white p-6 rounded shadow-lg">
                <button
                  onClick={() => setIsOpen(false)}
                  className=" flex float-end custom-close-icon  text-gray-600 hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
                <div className="flex justify-center">
                  <img width={250} src={`/uploads/images/${Meal.image}`}></img>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-10 p-8  shadow-2xl rounded-4xl text-black "
                >
                  <h2 className="text-l font-bold text-center text-indigo-600">
                    Meal
                  </h2>
                  <div className="flex flex-col ">
                    {/* Meal Name Input */}
                    <div>
                      <label
                        htmlFor="Name"
                        className="block text-m font-semibold text-gray-700"
                      >
                        Meal Name:
                      </label>
                      <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={Meal?.Name}
                        onChange={handleInputChangeD}
                        className="mt-1 w-full p-3  border border-gray-300 rounded-full focus:outline-none text-black focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                      />
                      <div className="flex flex-row  justify-between">
                      

                        <div className=" my-6 w-full">
                          <label
                            htmlFor="Name"
                            className="block text-m font-semibold text-gray-700"
                          >
                            Price:
                          </label>
                          <input
                            type="Number"
                            id="Price"
                            name="Price"
                            value={Meal?.Price}
                            onChange={handleInputChangeD}
                            className="mt-1 w-full p-3  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="Name"
                        className="block p-2 text-m font-semibold text-gray-700"
                      >
                        Meal ingredients:
                      </label>
                      <textarea
                        id="ingredients"
                        name="ingredients"
                        value={Meal?.ingredients}
                        onChange={handleInputChangeD}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 whitespace-pre-wrap"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
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
          </div>
        )}
      </>
    );
  }
}
