import Navbar from "@/Components/Admin/Admin/AdminNav";
import GallarysButton from "@/Components/Admin/Admin/Gallary/GallaryButton";
import AddGallary from "@/Components/Admin/Admin/Gallary/AddGallary";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function Gallary({}) {
  const [Gallarys, setGallarys] = useState([]);
  const router = useRouter();
  const id = router.query;
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
  const [changed, setchanged] = useState(true);
  function handleChanged() {
    setchanged(!changed);
  }
  // Fetch data when the component mounts
  useEffect(() => {
    if (changed) {
      getdata();
      setchanged(false);
    }
  }, [changed]);
  useEffect(() => {
    if (!Gallarys||Gallarys.length=== 0) {
      getdata();
    }
  }, [Gallarys]);
  // Render the table with the data

  return (
    <>
      <Navbar id={id} />

      <div className="content ">
        <main className="p-4">
          <AddGallary id={id} changed={handleChanged} />
          <div className="header">
            <div className="left">
              <h1>Gallary</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Gallarys</a>
                </li>
                <li>
                  <a href="#" className="active">
                    List Gallary
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <section className="wrapper">
          <main className="row12 title">
            <ul className="flex justify-between text-xl  border-gray-300 ">
           
              <li>Type</li>
              <li>Image</li>
              <li>Changes</li>
            </ul>
          </main>

          {Gallarys?.map((Gallary) => (
            <article className="row12 nfl " key={Gallary._id}>
              <ul className="flex justify-between items-center text-sm  border-gray-300 ">
           
                <li>{Gallary.type}</li>
                <li>
                  <img
                    src={`/uploads/images/${Gallary.image}`}
                    alt={Gallary.image}
                    className="w-14 h-14 rounded-full"
                  />
                </li>
                <li className="flex space-x-2">
                  <GallarysButton
                    text="Düzenle"
                    clas="edit"
                    id={Gallary._id}
                    changed={handleChanged}
                    Gallarys={Gallary}
                  />
                  <GallarysButton
                    text="Sil"
                    clas="delete"
                    id={Gallary._id}
                    changed={handleChanged}
                    Gallarys={Gallary}
                  />
                </li>
              </ul>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
