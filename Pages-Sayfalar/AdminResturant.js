import Navbar from "@/Components/Admin/Admin/AdminNav";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminResturant() {
  const router = useRouter();
  const id = router.query;
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
        setComments(sortedComments.slice(0, 3));  
      }
    } catch (error) {
      console.error("Error fetching Comments:", error);
      // Handle error (e.g., show an error message)
    }
  };
  useEffect(() => {
    getdataComments();
  }, []);
  return (
    <>
      <Navbar id={id} />
      <div className="content">
        <main>
          <div className="header">
            <div className="left">
              <h1>Resturants</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Resturants</a>
                </li>

                <li>
                  <a href="#" className="active">
                    List Resturants
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-start " id="Comments">
        <div className="flex flex-col w-full max-w-3xl">
          <h1 className="text-blue-800 text-5xl font-bold mb-8">Top 3 Comments</h1>

          <div className="space-y-8 ">
            {comments?.map((comment) => (
              <div className="flex items-start w-full">
                <div className="w-24 rounded-full overflow-hidden mr-6">
                  <img
                    src="/noavatar.png"
                    alt="User Image"
                    className="object-cover w-full"
                  />
                </div>
                <div className="bg-slate-100 w-full p-6 rounded-lg shadow transition-all ease-in duration-600  hover:bg-cyan-950 hover:text-white">
                  <h4 className="mb-4 text-blue-500 font-bold">
                    {comment.addername}
                  </h4>
                  <p className="mb-4">{comment.Text}</p>
                  <div className="flex items-center">
                    <button
                      className="space-x-2 text-blue-500 mr-4 hover:text-white"
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

        </div>
      </div>
        </main>
      </div>
    </>
  );
}
