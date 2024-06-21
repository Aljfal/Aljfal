import Navbar from "@/Components/Admin/Admin/AdminNav";
import EmployeeButton from "@/Components/Admin/Admin/Employee/EmployeeButton";
import AddEmployee from "@/Components/Admin/Admin/Employee/AddEmployee";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function Employee({}) {
  const [Employees, setEmployees] = useState([]);
  const router = useRouter();
  const id = router.query;
  const getdata = async () => {
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
    if (!Employees||Employees.length=== 0) {
      getdata();
    }
  }, [Employees]);
  // Render the table with the data

  return (
    <>
      <Navbar id={id} />

      <div className="content ">
        <main className="p-4">
          <AddEmployee id={id} changed={handleChanged} />
          <div className="header">
            <div className="left">
              <h1>Employees</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Employees</a>
                </li>
                <li>
                  <a href="#" className="active">
                    List Employees
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <section className="wrapper">
          <main className="row12 title">
            <ul className="flex justify-between text-xl  border-gray-300 ">
              <li>NAME</li>
              <li>Type</li>
              <li>Image</li>
              <li>Changes</li>
            </ul>
          </main>

          {Employees?.map((Employee) => (
            <article className="row12 nfl " key={Employee._id}>
              <ul className="flex justify-between items-center text-sm  border-gray-300 ">
                <li>{Employee.Name}</li>
                <li>{Employee.type}</li>
                <li>
                  <img
                    src={`/uploads/images/${Employee.image}`}
                    alt={Employee.image}
                    className="w-14 h-14 rounded-full"
                  />
                </li>
                <li className="flex space-x-2">
                  <EmployeeButton
                    text="Düzenle"
                    clas="edit"
                    id={Employee._id}
                    changed={handleChanged}
                    Employees={Employee}
                  />
                  <EmployeeButton
                    text="Sil"
                    clas="delete"
                    id={Employee._id}
                    changed={handleChanged}
                    Employees={Employee}
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
