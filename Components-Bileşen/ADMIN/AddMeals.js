import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AddMeals({ id,changed }) {
  const initialFormData = {
    Name: "",
    ingredients: "",
    Rate: 0,
    Price: "",
    image: "",
    Resturantid: id.id,
    items: [],
  };

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addMeals = async () => {
    await handleImage();
    try {
      const response = await axios.post("/api/Meals", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsOpen(false);
        setImagePreview(null);
        setFormData(initialFormData);
        changed()
      }
    } catch (error) {
      console.error("Error adding Meals:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMeals();
  };

  const handleImage = async () => {
    if (!file) {
      return;
    }

    const formFile = new FormData();
    formFile.append("file", file);

    try {
      const response = await fetch("/api/Upload_images", {
        method: "POST",
        body: formFile,
        headers: {
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        formData.image=data.filename
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const handleCancelImage = () => {
    setFile(null);
    setImagePreview(null);
    document.getElementById("fileInput").value = null;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-5 right-3 bg-green-500 hover:bg-blue-600 text-white rounded-full px-4 py-4 transition duration-300 shadow-lg"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Meal
      </button>
      {isOpen && (
        <div className="test33 fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center transition-opacity">
          <div className="relative bg-white p-6 rounded shadow-lg">
          
            <form onSubmit={handleSubmit} className=" space-y-6 p-6 rounded-md shadow-md ">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition duration-300"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
              <h2 className="text-l font-bold text-center text-indigo-600">
                Add Meals
              </h2>
              <div className="flex flex-col items-center">
                <label className="block font-semibold text-gray-700 mb-1">
                  Image:
                </label>
                <div className="relative border border-gray-300 rounded-md overflow-hidden h-48 w-48 flex items-center justify-center">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Image preview"
                        className="object-cover h-full w-full"
                      />
                      <button
                        type="button"
                        onClick={handleCancelImage}
                        className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600 rounded-full p-1"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </>
                  ) : (
                    <div className="text-gray-400">Add Image</div>
                  )}
                </div>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="mt-1  p-4  bg-sky-400 border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "

                />
              </div>
              <div className=" flex flex-col  gap-6">
                <div>
                  <label
                    htmlFor="Name"
                    className="text-l font-bold text-gray-800 mb-2"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-5  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "

                    placeholder="Enter Name"
                  />
                </div>
                
                <div className="flex flex-row  gap-4">
            
                  <div className=" w-full">
                    <label
                    htmlFor="Price"
                    className="text-l font-bold text-gray-800 mb-2"
                  >
                    Price:
                  </label>
                  <input
                    type="text"
                    id="Price"
                    name="Price"
                    value={formData.Price}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-5  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                   
                    placeholder="Enter Price"
                  />
                  </div>
                </div>
                <div>
                
                </div>
                <div>
                  <label
                    htmlFor="ingredients"
                    className="text-l font-bold text-gray-800 mb-2"
                  >
                    Ingredients:
                  </label>
                  <input
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-8  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                  
                    placeholder="Enter Ingredients"
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
