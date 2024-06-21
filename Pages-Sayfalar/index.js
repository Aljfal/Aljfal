import MainAbout from "@/Components/Main/MainAbout";
import MainNav from "@/Components/Main/MainNav";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faFaceAngry } from "@fortawesome/free-solid-svg-icons";
import Special from "@/Components/Main/MainSpecial";
import MenuSpecial from "@/Components/Main/MainMenu";
import MainResturants from "@/Components/Main/MainResturants";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [scrollUpVisible, setScrollUpVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setScrollUpVisible(true);
      } else {
        setScrollUpVisible(false);
      }
    };

    const handleRouteChange = () => {
      // Hide scrollup button when navigating to a new page
      setScrollUpVisible(false);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Add router change event listener
    router.events.on("routeChangeComplete", handleRouteChange);

    // Remove event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [formData, setFormData] = useState({
    date: new Date(),
    Name: "",
    Mail: "",
    Phone: "",
    Message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/OwnerRequest", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        // Notify the parent component about the new restaurant added
        setFormData({
          date: new Date(),
          Name: "",
          Mail: "",
          Phone: "",
          Message: "",
        });

      }
    } catch (error) {
      console.error("Error adding restaurant:", error);
      // Handle error (e.g., show notification to user)
    }
  };


  const [Meals, setMeals] = useState([]);
  // Fetch data function
  const getdatameal = async () => {
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
        const data = response.data.data;

        // Sort the meals by rate in descending order
        const sortedMeals = data.sort((a, b) => b.Rate - a.Rate);
        setMeals(sortedMeals);
      }
    } catch (error) {
      console.error("Error fetching Meals:", error);
      // Handle error (e.g., show an error message)
    }
  };

  useEffect(() => {
    getdatameal();
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Pacifico"
        rel="stylesheet"
        type="text/css"
      />
      <MainNav />
      <MainAbout />
      <Special />
      <MenuSpecial Meals={Meals}/>
      <MainResturants />
      <div>
        {/* Your page content */}
        {/* Show scrollup button only if scrollUpVisible state is true */}
        {scrollUpVisible && (
          <button className="scrollup" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        )}
      </div>
      <footer className=" bg-white text-blue-950 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <img
                src="logo-no-background.png"
                alt="Logo"
                className="h-12 mb-4"
              />
              <p className="text-black">
                Your go-to platform for honest, insightful, and comprehensive
                restaurant reviews, helping you make the best dining choices.
              </p>
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <h3 className="font-bold mb-2">Socials</h3>
                <ul className="flex">
                  <li className="mr-8">
                    <a
                      href="https://www.facebook.com"
                      className="text-gray-400 hover:text-blue-950"
                    >
                      <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                  </li>
                  <li className="mr-8">
                    <a
                      href="https://www.twitter.com"
                      className="text-gray-400 hover:text-blue-950"
                    >
                      <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </a>
                  </li>
                  <li className="mr-8">
                    <a
                      href="https://www.instagram.com"
                      className="text-gray-400 hover:text-blue-950"
                    >
                      <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                  </li>
                  <li className="mr-8">
                    <a
                      href="https://www.linkedin.com"
                      className="text-gray-400 hover:text-blue-950"
                    >
                      <FontAwesomeIcon icon={faLinkedin} size="lg" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h3 className="font-bold mb-2">About Us</h3>
              <p className="text-black">
                We are dedicated to providing the best dining experience with
                our delicious cuisine and exceptional service. Visit us to enjoy
                a great meal with family and friends.
              </p>
            </div>

            <div className="w-full md:w-1/4">
              <h3 className="font-bold mb-2">Contact Us</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 mb-2 bg-gray-700 text-white placeholder-white rounded"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  name="Mail"
                  value={formData.Mail}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mb-2 bg-gray-700 text-white placeholder-white rounded"
                />
                <input
                  type="tel"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  required
                  placeholder="Your Phone"
                  className="w-full p-2 mb-2 bg-gray-700 text-white placeholder-white rounded"
                />
                <textarea
                  placeholder="Your Message"
                  name="Message"
                  value={formData.Message}
                  onChange={handleChange}
                  required
                  className="w-full p-2 mb-2 bg-gray-700 text-white placeholder-white rounded"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
