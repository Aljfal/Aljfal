import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import ShowType from "./ShowType";
import axios from "axios";

export default function AddGallary({ changed, id }) {
  const initialFormData = {
    type: "",
    image: "",
    Resturantid: id.id,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const AddGallary = async () => {
    await handleImage();

    try {
      const response = await axios.post("/api/Gallarys", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setIsOpen(false);
        changed();
        setImagePreview(null);
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error adding Gallary:", error);
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
    setFormData({
      ...formData,
      type: selectedIte,
    });
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
    await AddGallary();
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
        className="absolute top-5 right-3 bg-green-500 hover:bg-blue-600 text-white rounded-full px-4 py-4 transition duration-300 shadow-lg"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Gallary
      </button>
      {isOpen && (
        <div className="custom-popup-overlay outline-double outline-3 outline-offset-2 text-black">
          <div className="bg-gray-600 shadow-lg rounded-lg mx-auto">
            <div className="flex items-center justify-center p-4">
              <div className="w-[350px]  bg-cyan-600">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="relative top-0 right-0 text-white bg-red-500 hover:bg-red-700 transition duration-300 p-1 "
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 p-8 bg-gray-100  shadow-2xl"
                >
                  <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
                    Add Gallery
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
                              className="object-cover w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={handleCancelImage}
                              className="absolute top-1 right-1 bg-red-500 text-white hover:bg-red-600 rounded-full p-1"
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
                        id="fileInput"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="mt-1  p-4  bg-sky-400 border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 "
                      />
                    </div>
                    <div>
                      <label className="block text-l font-semibold text-gray-800 mb-2">
                        Gallery Type:
                      </label>
                      <ShowType
                        onChange={handleChanged}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 bg-gray-100 text-gray-800"
                      />
                    </div>
                  
                  <div className="flex justify-center">
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
        </div>
      )}
    </>
  );
}
