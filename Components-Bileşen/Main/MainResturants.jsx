import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function MainResturants() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [ref3, inView3] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [restaurants, setRestaurants] = useState([]);
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

  const [Meals, setMeals] = useState([]);

  // Fetch data function
  const getdata = async () => {
    try {
      // Make a GET request to the API
      const response = await axios.get(`/api/Meals`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      // Update the state with the fetched data
      if (response.status >= 200 && response.status < 300) {
        setMeals(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Meals:", error);
      // Handle error (e.g., show an error message)
    }
  };
  useEffect(() => {
    getData();
    getdata();
  }, []);
  function resturantmeals(id) {
    const filteredmeals = Meals.filter((meal) => {
      return meal.Resturantid === id;
    });
    return (
      <>
        <ul>
          {filteredmeals.map((meal) => (
            <>
              <li className=" flex " key={meal._id}>
                <img
                  src={`/uploads/images/${meal.image}`}
                  className=" t22as"
                ></img>
                <div className="flex justify-between w-full">
                  {meal.Name}

                  <span className=" text-end"> $ {meal.Price}</span>
                </div>
              </li>
            </>
          ))}
        </ul>
      </>
    );
  }
  return (
    <>
      <section id="ourPakeg" className="ourPakeg">
        <div className="container">
          <div className="main_pakeg_content">
            <div className="row">
              <div className="head_title text-center">
                <h4>Amazing</h4>
                <h3>Delicious</h3>
              </div>
              {restaurants?.map((restaurant) => (
                <div
                  key={restaurant._id}
                  ref={ref}
                  className={`bg-left bg-no-repeat  p-8 overflow-hidden mt-[60px] text-right wow ${
                    inView ? "animated rotateInDownRight" : ""
                  }`}
                  style={{
                    backgroundImage: `url("/uploads/images/${restaurant?.image}")`,
                    backgroundSize: 'cover', 

                  }}
                >
                  <div className="col-md-6 col-md-offset-6 col-sm-8 col-sm-offset-4">
                    <div className="single_pakeg_text">
                      <div className="pakeg_title">
                        <Link href={`${restaurant._id}`}>
                          <h4>{restaurant.Name}</h4>
                        </Link>
                      </div>
                      {resturantmeals(restaurant._id)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
