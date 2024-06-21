import Navbar from "@/Components/Admin/MainAdmin/MainAdminNav";
import AddRestaurant from "@/Components/Admin/MainAdmin/Restuarants/AddRestuarant";
import RestaurantButton from "@/Components/Admin/MainAdmin/Restuarants/RestaurantButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function MainAdminResturant() {
  const [restaurants, setRestaurants] = useState([]);
  const [changed, setChanged] = useState(true);

  const router = useRouter();

  // Fetch data function
  const getData = async () => {
    try {
      const response = await axios.get("/api/Resturants", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setRestaurants(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Restaurants:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    if (changed) {
      getData();
      setChanged(false);
    }
  }, [changed]);

  // Handle change function
  function handleChanged() {
    setChanged(!changed);
  }

  // Function to handle link click
  const handleLinkClick = (id) => {
    router.push(`/Admin/${id}/AdminResturant`);
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <main>
          <AddRestaurant changed={handleChanged} />
          <div className="header">
            <div className="left">
              <h1>Restaurants</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Restaurants</a>
                </li>
                <li>
                  <a href="#" className="active">
                    List Restaurants
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <section className="wrapper">
          <main className="row12 title">
            <ul>
              <li>Restaurant Name</li>
              <li>Owner Name</li>
              <li>Phone Number</li>
              <li>Address</li>
              <li>E-Mail</li>
              <li>Changes</li>
            </ul>
          </main>
          {restaurants?.map((restaurant) => (
            <article className="  row12 nfl" key={restaurant._id}>
              <ul>
                <li>
                  <a
                    className="abc"
                    href="#"
                    onClick={() => handleLinkClick(restaurant._id)}
                  >
                    {restaurant.Name}
                  </a>
                </li>
                <li>{restaurant.Ownername}</li>
                <li>{restaurant.PhoneNumber}</li>
                <li>{restaurant.Adress}</li>
                <li>{restaurant.Mail}</li>
                <li>
                  <RestaurantButton changed={handleChanged}
                    text="Edit"
                    clas="edit"
                    id={restaurant._id}
                    Restaurants={restaurant}
                  />
                  <RestaurantButton changed={handleChanged}
                    text="Delete"
                    clas="delete"
                    id={restaurant._id}
                    Restaurants={restaurant}
                  />
                </li>
              </ul>
              <ul className="more-content">
                <li>{restaurant.Address}</li>
              </ul>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
