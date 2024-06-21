import { faBowlFood, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

export default function mealMenu({ Meals, user,changed }) {
  function truncateText(text) {
    if (text.length <= 100) {
      return text;
    }
    return text.substring(0, 100) + "...";
  }
  const [isOpen, setIsOpen] = useState(false);
  const [meal, setMeal] = useState("");
  const [Rating, setRating] = useState({
    Rate: 0,
    RateAdderid: user?._id,
  });
  const handlerating = (rate) => {
    setRating({
      ...Rating,
      Rate: rate,
    });
  };
  const updatemeal = async () => {
    if (meal?.items?.some((item) => item?.RateAdderid === user?._id)) {
      return;
    }
    try {
      let meall = { ...meal, items: [...meal.items, Rating] };
      meall.Rate += Rating.Rate;
      const response = await axios.put(
        `/api/Meals/${meal?._id}`,
        meall,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        changed();
        setIsOpen(false);

      }
    } catch (error) {
      console.error("Error updating meal:", error);
      // Handle error
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updatemeal();
  };
  useEffect(() => {
    setRating({
      ...Rating,
      RateAdderid: user?._id,
    });
  }, [meal]);
  return (
    <>
      <div id="menu" className="menu-main pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div
                className="wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.1s"
              >
                <h2 className="block-title text-center">Our Menu</h2>
                <p className="title-caption text-center mb-10">
                  we offer a wide variety of dishes crafted with the finest
                  ingredients to suit every taste. Begin with our appetizing
                  starters, from fresh salads to savory soups. Our main courses
                  include succulent meats, fresh seafood, and delightful
                  vegetarian options, each prepared to perfection. End your meal
                  with one of our exquisite desserts, ensuring a sweet and
                  satisfying finish.
                </p>
              </div>

              <div className="slider slider-single">
                {Meals.map((meal) => (
                  <div
                    className="col-lg-6 col-md-6 col-sm-6 col-xs-6  cursor-pointer"
                    key={meal._id}
                    onClick={() => {
                      setIsOpen(true);
                      setMeal(meal);
                    }}
                  >
                    <div className="offer-item ">
                      <img
                        src={`/uploads/images/${meal.image}`}
                        alt=""
                        className="img-responsive"
                      />
                      <div>
                        <h3>{meal.Name}</h3>
                        <p>{truncateText(meal.ingredients)}</p>
                      </div>
                      <span className="offer-price  ">${meal.Price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="custom-popup-overlay outline-double outline-3 outline-offset-2">
          <div className="bg-gray-200 shadow-lg rounded-lg mx-auto">
            <div className="flex items-center justify-center p-4">
              <div className="w-[550px] ">
                <div className="flex justify-end">
                  <div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className=" text-red-500 hover:text-red-700 transition duration-300 p-1 "
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                  <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-4">Meal Details</h1>
                    <div className="flex items-center mb-8 ">
                      <div className="flex space-x-1 ">
                        {[1, 2, 3, 4, 5].map((rate) => (
                          <FontAwesomeIcon
                            key={rate}
                            icon={faStar}
                            className={`${
                              Number(meal?.items?.length === 0 ? 0 : meal?.Rate / meal?.items?.length)
                              >= rate
                                ? "text-orange-500"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-xl font-semibold">
                        { Number(meal?.items?.length === 0 ? 0 : meal?.Rate / meal?.items?.length)?.toFixed(1)}
                      </span>
                    </div>

                    <div className="bg-white shadow-md rounded p-8 mb-4">
                      <div className="flex items-center justify-between mb-4 ">
                        <h2 className="text-xl font-bold">{meal.Name}</h2>
                        <span className="text-gray-600">{meal.Price} $</span>
                      </div>
                      <img
                        src={`/uploads/images/${meal.image}`}
                        alt={meal.Name}
                        className="w-1/2 mb-4 rounded-lg hover:shadow-lg transition duration-300"
                      />
                      <p className="text-gray-700 mb-4">{meal.ingredients}</p>
                      <form
                        onSubmit={handleSubmit}
                      >
                        <h2 className="text-3xl font-bold mb-4 text-orange-500">
                          Rate our meal
                        </h2>
                        <div className="flex space-x-2 mb-4">
                          {[1, 2, 3, 4, 5].map((rate) => (
                            <button
                              key={rate}
                              type="button"
                              onClick={() => handlerating(rate)}
                              className="text-2xl"
                            >
                              <FontAwesomeIcon
                                icon={faStar}
                                className={`${
                                  Rating.Rate >= rate
                                    ? "text-orange-500"
                                    : "text-gray-400"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                        <button
                          type="submit"
                          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
