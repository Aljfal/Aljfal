import { useState, useEffect } from "react";
import ShowType from "./ShowType";
import ShowNumber from "./ShowNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AddReservation({ changed, id }) {
  const initialFormData = {
    date: "",
    Name: "",
    Mail: "",
    Phone: "",
    Occasion: "",
    Time: "",
    NumberOfHuman: 1,
    Resturantid: id.id,
    Adderid:"Test asr",
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

  const addReservation = async () => {
    try {
      const response = await axios.post("/api/Reservation", formData, {
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
      console.error("Error adding Reservation:", error);
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
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReservation();
  };

  const handleInputChanged = (selectedIte) => {
    setFormData({ ...formData, type: selectedIte });
  };

  const handleInputChangeNumber = (selectedIte) => {
    setFormData({ ...formData, NumberOfHuman: selectedIte });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-5 right-3 bg-green-500 hover:bg-blue-600 text-white rounded-full px-4 py-4 transition duration-300 shadow-lg"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Reservation
      </button>
      {isOpen && (
        <div className="custom-popup-overlay outline-double outline-3 outline-offset-2 fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-600 shadow-lg rounded-lg mx-auto">
            <div className="flex items-center justify-center p-4">
              <div className="w-[550px] bg-white rounded-2xl shadow-2xl">
                <div className="flex justify-end p-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-gray-800 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <h2 className="text-l font-bold text-center p-4 text-indigo-600">
                  Add Reservation
                </h2>
                <form
                  id="contact-form"
                  method="post"
                  className="reservations-box"
                  name="contactform"
                  onSubmit={handleSubmit}
                >
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-box">
                      <input
                        type="text"
                        name="Name"
                        id="form_name"
                        placeholder="Name"
                        required="required"
                        data-error="Firstname is required."
                        value={formData.Name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-box">
                      <input
                        type="email"
                        name="Mail"
                        id="email"
                        placeholder="E-Mail ID"
                        required="required"
                        data-error="E-mail id is required."
                        value={formData.Mail}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-box">
                      <input
                        type="text"
                        name="Phone"
                        id="phone"
                        placeholder="contact no."
                        value={formData.Phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-box">
                      <input
                        type="date"
                        name="date"
                        id="date-picker"
                        placeholder="Date"
                        required="required"
                        data-error="Date is required."
                        value={formData.date}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-box">
                      <input
                        type="time"
                        name="Time"
                        id="time-picker"
                        placeholder="Time"
                        required="required"
                        data-error="Time is required."
                        value={formData.Time}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-box">
                      <select
                        name="NumberOfHuman"
                        id="no_of_persons"
                        className="selectpicker"
                        value={formData.NumberOfHuman}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          No. Of persons
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-box">
                      <select
                        name="Occasion"
                        id="occasion"
                        className="selectpicker"
                        value={formData.Occasion}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Occasion
                        </option>
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="text-center">
                      <button
                        className="hover:shadow-form rounded-full bg-[#211f4e] py-4 px-7 text-center text-l font-semibold text-white outline-none mb-6"
                        type="submit"
                        value="SEND"
                        id="submit"
                      >
                        BOOK MY TABLE{" "}
                      </button>
                    </div>
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
