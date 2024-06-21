import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import ShowRating from "./ShowRating";
import axios from "axios";
import ShowUsers from "../Users/ShowUsers";
const AddRestaurant = (changed) => {
  const initialFormData = {
    Name: "",
    Ownername: "",
    Ownerid: "",
    PhoneNumber: "",
    Adress: "",
    Rating: 0,
    image: "",
    Logo: "",
    description: "",
    Mail:"",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileL, setFileL] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewL, setImagePreviewL] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const addresturant = async () => {
    await handleImage()
    await handleLogo()
    try {
      const response = await axios.post("/api/Resturants", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        // Notify the parent component about the new restaurant added
        setFormData(initialFormData);
        changed();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error adding restaurant:", error);
      // Handle error (e.g., show notification to user)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addresturant()
  };
  const [users, setUsers] = useState([]);

  // Fetch data function
  const getData = async () => {
    try {
      // Make a GET request to the API
      const response = await axios.get("/api/Users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      // Update the state with the fetched data
      if (response.status >= 200 && response.status < 300) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error (e.g., show an error message)
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getData();
  }, []);
  function selecteduser(data) {
    formData.Ownername = data.username;
    formData.Ownerid = data._id;
    formData.Mail=data.Mail
  }

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
        formData.image = data.filename;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleLogo = async () => {
    if (!fileL) {
      return;
    }

    const formFile = new FormData();
    formFile.append("file", fileL);

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
        formData.Logo = data.filename;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
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

  
  const handleFileChangeL = (event) => {
    const selectedFile = event.target.files[0];
    setFileL(selectedFile);

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewL(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreviewL(null);
    }
  };
  const handleCancelImageL = () => {
    setFileL(null);
    setImagePreviewL(null);
    document.getElementById("fileInput").value = null;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-5 right-3  bg-green-500 hover:bg-blue-600 text-white rounded-full px-4 py-4 transition duration-300 shadow-lg"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Restaurant
      </button>

      {isOpen && (
        <div className="test33 fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="custom-popup-inner">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded shadow-md p-8"
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <h2 className="font-bold text-center text-indigo-700 pb-3 mt-4">
                Add Restaurant
              </h2>

              <div className="flex justify-center mb-8">
                <div className="flex flex-col items-center">
                  <label className="block font-semibold text-gray-700 mb-1">
                    Image:
                  </label>
                  <div className="border border-gray-500 rounded-md overflow-hidden h-48 w-48 flex items-center justify-center">
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Image preview"
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={handleCancelImage}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          style={{ fontSize: "0.8rem" }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </>
                    ) : (
                      <div className="text-gray-400">Add Image</div>
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="mt-1 w-full p-5 bg-blue-950 text-white -400 border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                  />
                </div>
                <div className="flex flex-col items-center ml-6">
                  <label className="block font-semibold text-gray-700 mb-1">
                    Logo:
                  </label>
                  <div className="border border-gray-500 rounded-md overflow-hidden h-48 w-48 flex items-center justify-center">
                    {imagePreviewL ? (
                      <>
                        <img
                          src={imagePreviewL}
                          alt="Image preview"
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={handleCancelImageL}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          style={{ fontSize: "0.8rem" }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </>
                    ) : (
                      <div className="text-gray-400">Add Logo</div>
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChangeL}
                    accept="image/*"
                    className="mt-1 w-full p-5 bg-blue-950 text-white -400 border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                  />
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-2 gap-4">
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
                    value={formData.Name}
                    onChange={handleInputChange}
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
                    Owner:
                  </label>
                  <ShowUsers
                    data={users}
                    onChange={selecteduser}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                </div>
                {/* Phone Number input */}
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
                    value={formData.PhoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-5  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                    placeholder="Enter phone number"
                  />
                </div>
                {/* Address input */}
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
                    value={formData.Adress}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-5  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                    placeholder="Enter address"
                  />
                </div>
              </div>

              <div className=" mt-1 w-full p-5  flex flex-col ">
                <label
                  htmlFor="Adress"
                  className="block font-semibold text-gray-700"
                >
                  Description/About:
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt p-5 w-full  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                  placeholder="Enter description"
                />
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
};

export default AddRestaurant;
