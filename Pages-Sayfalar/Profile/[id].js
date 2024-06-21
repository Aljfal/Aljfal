import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/router";
export default function UserButton({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setlogin] = useState();
  const router = useRouter();
  const id = router.query;

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/Login/${id.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setlogin(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching login data:", error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(`/api/Login/${id.id}`, login, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        router.back()
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error updating login:", error);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setlogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };
  const [changed, setchanged] = useState(true);
  function handleChanged() {
    setchanged(!changed);
  }
  // Fetch data when the component mounts
  useEffect(() => {
    if (changed) {
      fetchData();
      setchanged(false);
    }
  }, [changed]);

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className=" p-20 bg-white rounded shadow-md ">
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <h2 className="text-4xl m-4 pb-6 font-bold text-center text-indigo-600">
          User Profile
        </h2>
        <div className="flex items-center">
          <label
            htmlFor="username"
            className="w-1/3 p-2 mr text-lg font-semibold text-gray-700"
          >
            Full Name:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={login?.username}
            onChange={handleInputChange}
            className="mt-1 w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="Mail"
            className="w-1/3  p-2 text-lg font-semibold text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="Mail"
            name="Mail"
            value={login?.Mail}
            onChange={handleInputChange}
            className="mt-1 w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="PhoneNumber"
            className="w-1/3  p-2 text-lg font-semibold text-gray-700"
          >
            Phone:
          </label>
          <input
            type="tel"
            id="PhoneNumber"
            name="PhoneNumber"
            value={login?.PhoneNumber}
            onChange={handleInputChange}
            className="mt-1 w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="Password"
            className="w-1/3  p-2 text-lg font-semibold text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={login?.Password}
            onChange={handleInputChange}
            className="mt-1 w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="Adress"
            className="w-1/3  p-2 text-lg font-semibold text-gray-700"
          >
            Address:
          </label>
          <input
            type="text"
            id="Adress"
            name="Adress"
            value={login?.Adress}
            onChange={handleInputChange}
            className="mt-1 w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-center pt-8">
          <button
            type="submit"
            className="hover:shadow-form rounded-full bg-[#211f4e] hover:bg-[#12112d] py-5 px-7 text-center text-lg font-semibold text-white outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
