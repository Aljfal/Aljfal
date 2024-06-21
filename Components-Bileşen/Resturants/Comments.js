import { faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Comments({ id, user, Comments, changed, Resturant }) {
  const initialFormData = {
    Text: "",
    addername: user?.username,
    image: user?.image,
    Resturantid: id.id,
    Likes: 0,
    Likesid: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [Rating, setRating] = useState({
    Rate: 0,
    RateAdderid: user?._id,
  });

  const [alerttext, setAlerttext] = useState("");
  const [averageRating, setAverageRating] = useState(Resturant?.Rate);

  const AddComment = async () => {
    if (!user) {
      setAlerttext("You need to login first");
      return;
    }
    formData.addername = user.username;
    formData.image = user.image;

    try {
      const response = await axios.post("/api/Comments", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        //changed();
        formData.Text = "";
        setFormData(initialFormData);
        changed();
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

  const updateComment = async (comment) => {
    if (!user) {
      setAlerttext("You need to login first");
      return;
    }
    if (comment.Likesid.includes(user?._id)) {
      setAlerttext("User has already liked this comment");
      return;
    }
    comment.Likes += 1;
    comment.Likesid.push(user._id);
    try {
      const response = await axios.put(
        `/api/Comments/${comment._id}`,
        comment,
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
      }
    } catch (error) {
      console.error("Error updating Employee:", error);
    }
  };
  const handlerating = (rate) => {
    setRating({
      ...Rating,
      Rate: rate,
    });
  };
  const updateRestaurant = async () => {
    if (Resturant?.items?.some((item) => item?.RateAdderid === user?._id)) {
      return;
    }
    try {
      Resturant = { ...Resturant, items: [...Resturant.items, Rating] };
      Resturant.Rate += Rating.Rate;
      const response = await axios.put(
        `/api/Resturants/${Resturant?._id}`,
        Resturant,
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
      }
    } catch (error) {
      console.error("Error updating Restaurant:", error);
      // Handle error
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateRestaurant();
  };
  useEffect(() => {
    setAverageRating(
      Resturant?.items?.length === 0
        ? 0
        : Resturant?.Rate / Resturant?.items?.length
    );
    setRating({
      ...Rating,
      RateAdderid: user?._id,
    });
  }, [Resturant]);
  return (
    <>
      <div className="flex flex-row justify-evenly " id="Comments">
        <div className="flex flex-col w-full max-w-3xl">
          <h1 className="text-orange-600 text-7xl font-bold mb-8">Comments</h1>

          <div className="space-y-8 h-96 overflow-y-auto">
            {Comments?.map((comment) => (
              <div className="flex items-start w-full" key={comment._id}>
                <div className="w-24  rounded-full overflow-hidden mr-6">
                  <img
                    src="noavatar.png"
                    alt="User Image"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="bg-slate-100 w-full p-6 rounded-lg shadow transition-all ease-in duration-600  hover:bg-orange-950 hover:text-white">
                  <h4 className="mb-4 text-orange-500 font-bold">
                    {comment.addername}
                  </h4>
                  <p className="mb-4">{comment.Text}</p>
                  <div className="flex items-center">
                    <button
                      className="space-x-2 text-orange-500 mr-4 hover:text-white"
                      onClick={() => updateComment(comment)}
                    >
                      {" "}
                      <FontAwesomeIcon icon={faThumbsUp} />
                    </button>
                    {comment.Likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start w-full mt-20">
            <div className="w-24 rounded-full overflow-hidden mr-6">
              <img
                src="noavatar.png"
                alt="User Image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="bg-slate-100 w-full p-6 rounded-lg shadow">
              <textarea
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Add a comment..."
                rows="4"
                name="Text"
                onChange={handleInputChange}
                value={formData.Text}
              ></textarea>
              <button
                className="mt-4 bg-orange-700 text-white py-2 px-4 rounded-lg hover:bg-orange-900"
                onClick={AddComment}
              >
                Post Comment
              </button>
              <span className="ml-5 text-red-600 text-xlg "> {alerttext}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center">
          <div>
            <h2 className="text-orange-600 text-7xl font-bold mb-8">
              Our Rating
            </h2>
          </div>
          <div className="flex items-center mb-8">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((rate) => (
                <FontAwesomeIcon
                  key={rate}
                  icon={faStar}
                  className={`${
                    averageRating >= rate ? "text-orange-500" : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-xl font-semibold">
              {averageRating?.toFixed(1)}
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white px-16 py-4 rounded shadow-md"
          >
            <h2 className="text-3xl font-bold mb-4 text-orange-500">
              Rate our service
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
                      Rating.Rate >= rate ? "text-orange-500" : "text-gray-400"
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
    </>
  );
}
