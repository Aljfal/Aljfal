import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import ShowType from "./ShowType";
import axios from "axios";

export default function AddEmployee({ changed, id }) {
  const initialFormData = {
    Name: "",
    type: "",
    image: "",
    description:"",
    Resturantid: id.id,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const AddEmployee = async () => {
    await handleImage();

    try {
      const response = await axios.post("/api/Employee", formData, {
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
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error adding Employee:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChanged = (selectedIte) => {
    formData.type = selectedIte;
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
    AddEmployee();
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
        formData.image = data.filename;
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

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-5 right-3 bg-green-500 hover:bg-blue-600 text-white rounded-full px-10 py-4 transition duration-300 shadow-lg"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Employee
      </button>
      {isOpen && (
        <div className="test33 fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="custom-popup-inner   max-w-3xl  ">
            <form
              onSubmit={handleSubmit}
              className="space-y-1/2 p-3/2 bg-white rounded shadow-md"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <h2 className="text-l font-bold text-center text-indigo-700 mb-4">
                Add Employee
              </h2>

              <div className="space-y-6">
                {/* First Row: Image Input */}
                <div className="flex flex-col items-center">
                  <label className="font-semibold text-gray-700 mb-2 mr-32">
                    Image:
                  </label>
                  <div className="relative border border-gray-500 rounded-md overflow-hidden h-48 w-48 flex items-center justify-center mb-4">
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Image preview"
                          className="object-cover "
                        />
                        <button
                          type="button"
                          onClick={handleCancelImage}
                          className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600"
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
                    className="mt-1 w-3/5 p-5   bg-slate-800 border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                  />
                </div>

                {/* Second Row: Name and Employee Type */}
                <div className="flex flex-row justify-between space-x-4">
                  {/* Name input */}
                  <div className="flex-1 ml-5">
                    <label className="font-semibold  px-4">Name:</label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                       className="mt-1 w-full p-5  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                      placeholder="Enter name"
                    />
                  </div>
                  {/* Employee Type input */}
                  <div className="flex-1 ">
                    <label
                      className="   font-semibold px-4"
                      htmlFor="EmployeeType"
                    >
                      Employee Type:
                    </label>
                    <ShowType
                      onChange={handleChanged}
                    />
                  </div>
                 
                </div>
                <div className="flex-1 mx-4">
                    <label className="font-semibold  px-4">Description:</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                       className="mt-1 w-full p-5  border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                      placeholder="Description"
                    />
                  </div>
              </div>

              <div className="flex justify-center pt-8">
                <button
                  type="submit"
                  className="hover:shadow-form rounded-full bg-[#211f4e] py-5 px-7 text-center text-l font-semibold text-white outline-none mb-6"
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
