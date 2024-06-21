import React, { useState } from 'react';

export default function Signup() {
  const [username, setusername] = useState('');
  const [Mail, setMail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Adress, setAdress] = useState('');
  const [Password, setPassword] = useState('');
  const [Gender, setGender] = useState('');


  async  function createuser(username,
    Mail,
    PhoneNumber,
    Adress,
    Password,
    Gender){
    const response = await fetch("api/auth/signup", {
      method:'POST',
      body:JSON.stringify({username,
        Mail,
        PhoneNumber,
        Adress,
        Password,
        Gender}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data=await response.json()
    if (!response.ok) {
      console.error(data.message||'something went wrong!')
    }

  return data
}


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const test= await createuser(  username,
      Mail,
      PhoneNumber,
      Adress,
      Password,
      Gender)
      console.log(test)
  };

  return (
    <div className="mm13">
      <div className="container131">
        <div className="titlesign">Registration</div>
        <div className="contentsign">
          <form onSubmit={handleSubmit}>
            <div className="user-detailssignsign">
              <div className="input-boxsign">
                <span className="detailssign">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>
              <div className="input-boxsign">
                <span className="detailssign">Email</span>
                <input
                  type="text"
                  placeholder="Enter your eMail"
                  value={Mail}
                  onChange={(e) => setMail(e.target.value)}
                  required
                />
              </div>
              <div className="input-boxsign">
                <span className="detailssign">Phone Number</span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  value={PhoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="input-boxsign">
                <span className="detailssign">Adress</span>
                <input
                  type="text"
                  placeholder="Enter Your Adress"
                  value={Adress}
                  onChange={(e) => setAdress(e.target.value)}
                  required
                />
              </div>
              <div className="input-boxsign">
                <span className="detailssign">Password</span>
                <input
                  type="Password"
                  placeholder="Enter your Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="Gender-detailssign">
              <span className="Gender-titlesign">Gender</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <input
                    type="radio"
                    name="Gender"
                    id="dot-1"
                    value="male"
                    checked={Gender === 'male'}
                    onChange={() => setGender('male')}
                  />
                  <span className="dot one"></span>
                  <span className="Gender">Male</span>
                </label>
                <label htmlFor="dot-2">
                  <input
                    type="radio"
                    name="Gender"
                    id="dot-2"
                    value="female"
                    checked={Gender === 'female'}
                    onChange={() => setGender('female')}
                  />
                  <span className="dot two"></span>
                  <span className="Gender">Female</span>
                </label>
              </div>
            </div>
            <div className="btn12 z-10">
              <div className="inner"></div>
              <button type="submit">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
