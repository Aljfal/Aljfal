import ResturantAbout from "@/Components/Resturants/About";
import ResturantBestDishes from "@/Components/Resturants/Bestdishes";
import Comments from "@/Components/Resturants/Comments";
import ResturantFooter from "@/Components/Resturants/Footer";
import ResturantGallery from "@/Components/Resturants/Gallery";
import ResturantMenu from "@/Components/Resturants/Menu";
import ResturantNav from "@/Components/Resturants/Nav";
import ResturantPricingAndReservations from "@/Components/Resturants/PricingAndReservation";
import ResturantTeam from "@/Components/Resturants/Team";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Resturant() {
  const { data: session, status } = useSession();
  const [Gallarys, setGallarys] = useState([]);
  const [User, setUser] = useState();
  const [Resturant, setResturant] = useState("");

  const router = useRouter();
  const id = router.query;
  const getDataResturant = async () => {
    try {
      const response = await axios.get(`/api/Resturants/${id.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setResturant(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Restaurants:", error);
    }
  };
  const getdata = async () => {
    try {
      // Make a GET request to the API
      const response = await axios.get(`/api/Gallarys/${id.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      // Update the state with the fetched data
      if (response.status >= 200 && response.status < 300) {
        setGallarys(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Gallarys:", error);
      // Handle error (e.g., show an error message)
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getdata();
    getDataResturant();
  }, []);

  const [Employees, setEmployees] = useState([]);
  const getdataemployee = async () => {
    try {
      // Make a GET request to the API
      const response = await axios.get(`/api/Employee/${id.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      // Update the state with the fetched data
      if (response.status >= 200 && response.status < 300) {
        setEmployees(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Employees:", error);
      // Handle error (e.g., show an error message)
    }
  };

  useEffect(() => {
    getdataemployee();
  }, []);

  const [Meals, setMeals] = useState([]);
  // Fetch data function
  const getdatameal = async () => {
    try {
      // Make a GET request to the API
      const response = await axios.get(`/api/Meals/${id.id}`, {
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
    getdatameal();
  }, []);

  const getdatalog = async () => {
    try {
      // Make a GET request to the API
      const response = await axios.get(`/api/Login/${session.user.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      // Update the state with the fetched data
      if (response.status >= 200 && response.status < 300) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Gallarys:", error);
      // Handle error (e.g., show an error message)
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    if (session) getdatalog();
  }, [session]);
  const [comments, setComments] = useState([]);
  // Fetch data function
  const getdataComments = async () => {
    try {
      // Make a GET request to the API
      const response = await axios.get(`/api/Comments/${id.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      // Update the state with the fetched data
      if (response.status >= 200 && response.status < 300) {
        const sortedComments = response.data.data.sort(
          (a, b) => b.Likes - a.Likes
        );
        setComments(sortedComments);
      }
    } catch (error) {
      console.error("Error fetching Comments:", error);
      // Handle error (e.g., show an error message)
    }
  };
  const [changed, setChanged] = useState(true);
  function handleChanged() {
    setChanged(!changed);
  }

  useEffect(() => {
    if (changed) {
      getdataComments();
      getDataResturant();
      getdatameal();
      setChanged(false);
    }
  }, [changed]);

  return (
    <>
      <ResturantNav Logo={Resturant?.Logo} Name={Resturant?.Name} />
      <ResturantAbout About={Resturant?.description} />
      {
        //        <ResturantBestDishes/>
      }
      <ResturantMenu Meals={Meals} user={User} changed={handleChanged} />
      <ResturantTeam Employees={Employees} />
      <ResturantGallery Gallarys={Gallarys} />
      <Comments
        id={id}
        user={User}
        Comments={comments}
        changed={handleChanged}
        Resturant={Resturant}
      />

      <ResturantPricingAndReservations id={id} User={User} />

      <ResturantFooter
        About={Resturant?.description}
        Logo={Resturant?.Logo}
        Phone={Resturant?.PhoneNumber}
        Mail={Resturant?.Mail}
        Adress={Resturant?.Adress}
        Meals={Meals}
      />
    </>
  );
}
