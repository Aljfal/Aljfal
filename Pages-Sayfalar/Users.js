import Navbar from "@/Components/Admin/MainAdmin/MainAdminNav";
import UserButton from "@/Components/Admin/MainAdmin/Users/UsersButton";
import AddUser from "@/Components/Admin/MainAdmin/Users/AddUser";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MainAdminUser() {
  const [users, setUsers] = useState([]);
  const [changed, setChanged] = useState(true);

  // Fetch data function
  const getData = async () => {
    try {
      // Make a GET request to the API
      const response = await axios.get("/api/Users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
        },
      });

      // Update the state with the fetched data
      if (response.status >= 200 && response.status < 300) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error (e.g., show an error message)
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    if (changed) {
      getData();
      setChanged(false);
    }
  }, [changed]);

  // Handle change function
  function handleChanged() {
    setChanged(!changed);
  }

  // Render the table with the data
  return (
    <>
      <Navbar />
      <div className="content">
        <main>
          <AddUser changed={handleChanged} />
          <div className="header">
            <div className="left">
              <h1>Users</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Users</a>
                </li>
                <li>
                  <a href="#" className="active">
                    List Users
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>
        <section className="wrapper">
          <main className="row12 title">
            <ul>
              <li>Username</li>
              <li>Mail</li>
              <li>Phone Number</li>
              <li>Gender</li>
              <li>Type</li>
              <li>Changes</li>
            </ul>
          </main>
          {users?.map((user) => (
            <article className="row12 nfl" key={user._id}>
              <ul>
                <li>{user.username}</li>
                <li>{user.Mail}</li>
                <li>{user.PhoneNumber}</li>
                <li>{user.Gender}</li>
                <li>{user.type}</li>
                {user.type !== "MainAdmin" && (
                  <li>
                    <UserButton
                      text="Düzenle"
                      clas="edit"
                      id={user._id}
                      changed={handleChanged}
                      logins={user}
                    />
                    <UserButton
                      text="Sil"
                      clas="delete"
                      id={user._id}
                      changed={handleChanged}
                      logins={user}
                    />
                  </li>
                )}
              </ul>
              <ul className="more-content">
                <li>{user.Adress}</li>
              </ul>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
