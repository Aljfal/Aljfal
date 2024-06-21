import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faEye,
  faPlus,
  faClose,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ShowType from "./ShowType";
import ShowNumber from "./ShowNumber";

export default function UserButton({ clas, Reservations, id, changed }) {
  const [isOpen, setIsOpen] = useState(false);
  const [Reservation, setReservation] = useState(Reservations);

  const updateReservation = async () => {
    try {
      const response = await axios.put(`/api/Reservation/${id}`, Reservation, {
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
      console.error("Error updating Reservation:", error);
      // Handle error
    }
  };

  const updateReservationApproval = async () => {
    Reservation.Approval=true
    try {
      const response = await axios.put(`/api/Reservation/${id}`, Reservation, {
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
      console.error("Error updating Reservation:", error);
      // Handle error
    }
  };
  const delReservation = async () => {
    try {
      const response = await axios.delete(`/api/Reservation/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        changed();

        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error deleting Reservation:", error);
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
    setReservation(Reservations);
  }, [Reservations]);
  const handleInputChangeD = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...Reservation,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (clas) {
      case "delete":
        await delReservation();
        break;
      case "edit":
        await updateReservation();
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
    Reservation.type = selectedIte;
  };
  const handleChangeNumber = (selectedIte) => {
    Reservation.NumberOfHuman = selectedIte;
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
  }else if(clas == "Approval"){
    return(
      <>
        <button
          onClick={() => updateReservationApproval()}
          className="font-bold text-green-600"
        >
          Approval
        </button>
      </>
    )
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
                       value={Reservation.Name}
                       onChange={handleInputChangeD}
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
                       value={Reservation.Mail}
                       onChange={handleInputChangeD}
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
                       value={Reservation.Phone}
                       onChange={handleInputChangeD}
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
                       value={Reservation.date}
                       onChange={handleInputChangeD}
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
                       value={Reservation.Time}
                       onChange={handleInputChangeD}
                     />
                   </div>
                 </div>
                 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                   <div className="form-box">
                     <select
                       name="NumberOfHuman"
                       id="no_of_persons"
                       className="selectpicker"
                       value={Reservation.NumberOfHuman}
                       onChange={handleInputChangeD}
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
                       value={Reservation.Occasion}
                       onChange={handleInputChangeD}
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
}
