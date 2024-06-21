import Navbar from "@/Components/Admin/Admin/AdminNav";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function Comment() {
  const [Comments, setComments] = useState([]);
  const router=useRouter();
  const id = router.query;
  // Fetch data function
  const getdata = async () => {
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
        setComments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Comments:", error);
      // Handle error (e.g., show an error message)
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
      getdata();
      
    }, []);
  
    useEffect(() => {
      if (!Comments||Comments.length=== 0) {
        getdata();
      }
    }, [Comments]);

  // Render the table with the data

  return (
    <>
      <Navbar id={id}/>

      <div className="content">
        <main>
          <div className="header">
            <div className="left">
              <h1>Comments</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Comments</a>
                </li>

                <li>
                  <a href="#" className="active">
                    List Comments
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <section className="wrapper">
          <main className="row12 title">
            <ul>
              <li>Text</li>
              <li>Adder</li>     
              <li>Likes</li>
            </ul>
          </main>
          {Comments?.map((item) => (
            <article className="row12 nfl">
              <ul>
                <li>{item.Text}</li>
                <li>{item.addername}</li>
                <li>{item.Likes}</li>
              </ul>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
