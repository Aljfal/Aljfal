import MainAdminNav from "@/Components/Admin/MainAdmin/MainAdminNav";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Admin() {
  const { data: session, status } = useSession();
  const [OwnerRequests, setOwnerRequests] = useState([]);
  const [changed, setChanged] = useState(true);

  const router = useRouter();

  // Fetch data function
  const getData = async () => {
    try {
      const response = await axios.get("/api/OwnerRequest", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setOwnerRequests(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching OwnerRequests:", error);
    }
  };

  useEffect(() => {
    if (changed) {
      getData();
      setChanged(false);
    }
  }, [changed]);
  function handleChanged() {
    setChanged(!changed);
  }
  function datefunc(date) {
    const dateObject = new Date(date);

    // Arrange for Turkish format (day/month/year)
    const formattedDate =
      `${dateObject.getDate().toString().padStart(2, "0")}/` +
      `${(dateObject.getMonth() + 1).toString().padStart(2, "0")}/` +
      `${dateObject.getFullYear().toString().substring()}`;

    return formattedDate;
  }

  const [isOpen, setIsOpen] = useState(false);

  const delOwnerRequests = async (id) => {
    try {
      const response = await axios.delete(`/api/OwnerRequest/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsOpen(false);
        handleChanged()
      }
    } catch (error) {
      console.error("Error deleting OwnerRequests:", error);
      // Handle error
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        changed();
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <MainAdminNav />
      <div className="content">
        <main>
          <div className="header">
            <div className="left">
              <h1>Messages</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Messages</a>
                </li>
                <li>
                  <a href="#" className="active">
                    List Messages
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <section className="wrapper">
          <main className="row12 title">
            <ul>
              <li>date</li>
              <li>Name</li>
              <li>E-Mail</li>
              <li>Phone</li>
              <li>Changes</li>
            </ul>
          </main>
          {OwnerRequests?.map((item) => (
            <article className="  row12 nfl" key={item._id}>
              <ul>
                <li>
                  <a>{datefunc(item.date)}</a>
                </li>
                <li>{item.Name}</li>
                <li>{item.Mail}</li>
                <li>{item.Phone}</li>
                <li>
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
                          <form>
                            <div className="relative flex items-center justify-center h-12 w-12 mx-auto mb-6  bg-red-200 rounded-full ">
                              <button
                                onClick={() => setIsOpen(false)}
                                className="custom-close-icon   "
                              >
                                <FontAwesomeIcon
                                  icon={faClose}
                                  className="iconclose"
                                />
                              </button>
                            </div>
                            <div className="text-center text-2xl font-semibold mb-6">
                              Do you want to delete it?
                            </div>
                            <div className="flex justify-center transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-2xl">
                              <button
                                type="button"
                                className="w-32 px-6 py-3 text-lg text-white bg-red-600 rounded-md shadow-lg hover:bg-red-700 transition duration-200"
                                onClick={() => delOwnerRequests(item._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
              <ul className="more-content">
                <li>{item.Message}</li>
              </ul>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
