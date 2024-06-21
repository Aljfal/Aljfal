import Navbar from "@/Components/Admin/Admin/AdminNav";
import ReservationsButton from "@/Components/Admin/Admin/Reservtions/ReservtionsButton"
import AddReservation from "@/Components/Admin/Admin/Reservtions/AddReservtions";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function Reservation() {
  const [Reservations, setReservation] = useState([]);
  const router=useRouter();
  const id = router.query;
  // Fetch data function
  const getdata = async () => {
    try {
      // Make a GET request to the API
      const response = await axios.get(`/api/Reservation/${id.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      // Update the state with the fetched data
      if (response.status >= 200 && response.status < 300) {
        setReservation(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Reservation:", error);
      // Handle error (e.g., show an error message)
    }
  };
  const [changed, setchanged] = useState(true);
  function handleChanged()
  {
  
    setchanged(!changed)
  }
  // Fetch data when the component mounts
  useEffect(() => {
    if (changed) {
    getdata();
    setchanged(false)
    }
  }, [changed]);

  // Render the table with the data
  function datefunc(date) {
    const dateObject = new Date(date);

    // Arrange for Turkish format (day/month/year)
    const formattedDate =
      `${dateObject.getDate().toString().padStart(2, "0")}/` +
      `${(dateObject.getMonth() + 1).toString().padStart(2, "0")}/` +
      `${dateObject.getFullYear().toString().substring()}`;

    return formattedDate;
  }
  return (
    <>
      <Navbar id={id}/>

      <div className="content">
        <main>
          <AddReservation id={id} changed={handleChanged} />
          <div className="header">
            <div className="left">
              <h1>Reservation</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Reservation</a>
                </li>

                <li>
                  <a href="#" className="active">
                    List Reservation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <section className="wrapper">
          <main className="row12 title">
            <ul className="flex justify-between text-xl  border-gray-300 ">
              <li>date</li>
              <li>Name</li> 
              <li>Time</li> 
              <li>Number Of Human</li>    
              <li>Phone</li>    
              <li>Occasion</li>  
              <li>changes</li>
            </ul>
          </main>
          {Reservations?.map((Reservation) => (
            <article className="row12 nfl" key={Reservation._id}>
              <ul className="flex justify-between items-center text-sm  border-gray-300 ">
            
                <li>{ datefunc(Reservation.date)}</li>
                <li>{Reservation.Name}</li>
                <li>{Reservation.Time}</li>
                <li>{Reservation.NumberOfHuman}</li>    

                <li>{Reservation.Phone}</li>
                <li>{Reservation.Occasion}</li>
                <li>
                  <ReservationsButton 
                    text="Düzenle"
                    clas="edit"
                    id={Reservation._id}
                    changed={handleChanged}
                    Reservations={Reservation}
                  />
                  <ReservationsButton
                    text="Sil"
                    clas="delete"
                    id={Reservation._id}
                   changed={handleChanged}
                    Reservations={Reservation}
                  />
                  {!Reservation.Approval&&( <ReservationsButton
                    text="Approval"
                    clas="Approval"
                    id={Reservation._id}
                    changed={handleChanged}
                    Reservations={Reservation}
                  />)

                  }
                  
                </li>
              </ul>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
