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

export default function GallarysButton({ clas, changed, Gallarys, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [Gallary, setGallary] = useState(Gallarys);

  const updateGallary = async () => {
    try {
      const response = await axios.put(`/api/Gallarys/${id}`, Gallary, {
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
      console.error("Error updating Gallary:", error);
      // Handle error
    }
  };
  const handleChanged = (selectedIte) => {
    Gallary.type = selectedIte;
  };

  const delGallary = async () => {
    await delPhoto();
    try {
      const response = await axios.delete(`/api/Gallarys/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsOpen(false);
        changed();
      }
    } catch (error) {
      console.error("Error deleting Gallary:", error);
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
    setGallary(Gallarys);
  }, [Gallarys]);
  const handleInputChangeD = (e) => {
    const { name, value } = e.target;
    setGallary({
      ...Gallary,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (clas) {
      case "delete":
        delGallary();
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
   
  }
  const delPhoto = async () => {
    const filename = Gallary.image;

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
          className="  font-bold text-red-600"
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
  } 
    
  
}
