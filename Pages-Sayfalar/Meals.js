import Navbar from "@/Components/Admin/Admin/AdminNav";
import MealsButton from "@/Components/Admin/Admin/Meals/MealsButton";
import AddMeals from "@/Components/Admin/Admin/Meals/AddMeals";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function Meals() {
  const [Meals, setMeals] = useState([]);
  const router=useRouter();
  const id = router.query;
  // Fetch data function
  const getdata = async () => {
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
  const [changed, setchanged] = useState(true);
  function handleChanged()
  {
  
    setchanged(!changed)
  }
  // Fetch data when the component mounts
  useEffect(() => {
    if (changed) {
      getdata();
      setchanged(false)
      }
    }, [changed]);
  
    useEffect(() => {
      if (!Meals||Meals.length=== 0) {
        getdata();
      }
    }, [Meals]);

  // Render the table with the data

  return (
    <>
      <Navbar id={id}/>

      <div className="content">
        <main>
          <AddMeals id={id} changed={handleChanged}/>
          <div className="header">
            <div className="left">
              <h1>Meals</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Meals</a>
                </li>

                <li>
                  <a href="#" className="active">
                    List Meals
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <section className="wrapper">
          <main className="row12 title">
            <ul>
              <li>NAME</li>
              <li>Rate</li>     
              <li>Price</li>
              <li>image</li>
              <li>changes</li>
            </ul>
          </main>
          {Meals?.map((Meal) => (
            <article className="row12 nfl">
              <ul>
                <li>{Meal.Name}</li>
                <li>{Meal.Rate}</li>
                <li>{Meal.Price}</li>
                <li><img src={`/uploads/images/${Meal.image}`} width={30}></img></li>
                <li>
                  <MealsButton
                    text="Düzenle"
                    clas="edit"
                    id={Meal._id}
                    changed={handleChanged}
                    Meals={Meal}
                  />
                  <MealsButton
                    text="Sil"
                    clas="delete"
                    id={Meal._id}
                      changed={handleChanged}
                    Meals={Meal}
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
