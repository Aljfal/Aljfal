import axios from "axios";
import { useEffect, useState } from "react";

export default function ResturantPricingAndReservations({ id, User }) {
  const [reservationData, setReservationData] = useState({
    Name: "",
    Mail: "",
    Phone: "",
    date: "",
    Time: "",
    NumberOfHuman: "",
    Occasion: "",
    Resturantid: id.id,
    Adderid: User?._id,
  });
  const [alerttext, setAlerttext] = useState("");

  useEffect(() => {
    reservationData.Adderid = User?._id;
  }, [User]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!User)
      {
        setAlerttext("You need to login first")
        return;
      }
    try {
      const response = await axios.post("/api/Reservation", reservationData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        // Clear the form
        setReservationData({
          Name: "",
          Mail: "",
          Phone: "",
          date: "",
          Time: "",
          NumberOfHuman: "",
          Occasion: "",
          Resturantid: id.id,
          Adderid: User?._id,
        });
      }
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  return (
    <>
      <div
        id="reservation"
        className="reservations-main pad-top-100 pad-bottom-100"
      >
        <div className="container">
          <div className="row">
            <div className="form-reservations-box">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div
                  className="wow fadeIn"
                  data-wow-duration="1s"
                  data-wow-delay="0.1s"
                >
                  <h2 className="block-title text-center">Reservations</h2>
                </div>
                <h4 className="form-title">BOOKING FORM</h4>
                <p>PLEASE FILL OUT ALL REQUIRED* FIELDS. THANKS!</p>

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
                        value={reservationData.Name}
                        onChange={handleChange}
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
                        value={reservationData.Mail}
                        onChange={handleChange}
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
                        value={reservationData.Phone}
                        onChange={handleChange}
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
                        value={reservationData.date}
                        onChange={handleChange}
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
                        value={reservationData.Time}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-box">
                      <select
                        name="NumberOfHuman"
                        id="no_of_persons"
                        className="selectpicker"
                        value={reservationData.NumberOfHuman}
                        onChange={handleChange}
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
                        value={reservationData.Occasion}
                        onChange={handleChange}
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
                    <div className="reserve-book-btn text-center">
                      <button
                        className="hvr-underline-from-center"
                        type="submit"
                        value="SEND"
                        id="submit"
                      >
                        BOOK MY TABLE{" "}
                      </button>
                      <span className="ml-5 text-red-600 text-xlg "> {alerttext}</span>

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
