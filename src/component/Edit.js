import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    hobbies: "",
  });

  const handleChange = (e) => {
    console.log(e);
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const { id } = useParams("");
  const getData = async (e) => {
    const res = await fetch(`/getUser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 404 || !data) {
      alert(data);
    } else {
      setUser(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    const {name,email,phoneNumber,hobbies} = user;
    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,email,phoneNumber,hobbies
      })
    });
    const data2 = await res2.json();
    if(res2.status === 404 || !data2){
      alert("Cannot update");
    }else{
      alert("Updated Success");
      navigate('/');
    }
  }

  return (
    <div className="container">
      <form autoComplete="off">
        <div className="mt-3 row align-items-center">
          <div className="col-2">
            <label htmlFor="name" className="form-label">
              Name :{" "}
            </label>
          </div>
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your Full Name"
              required
              pattern="[a-zA-Z][a-zA-Z ]+"
            />
          </div>
        </div>
        <div className="mt-3 row align-items-center">
          <div className="col-2">
            <label htmlFor="email" className="form-label">
              Email :{" "}
            </label>
          </div>
          <div className="col-10">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your Email ID"
              required
              pattern='  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                          '
            />
          </div>
        </div>
        <div className="mt-3 row align-items-center">
          <div className="col-2">
            <label htmlFor="phoneNumber" className="form-label">
              Phone :{" "}
            </label>
          </div>
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your Phone Number"
              required
              pattern="(0/91)?[7-9][0-9]{9}"
            />
          </div>
        </div>
        <div className=" mt-3 mb-3 row align-items-center">
          <div className="col-2">
            <label htmlFor="hobbies" className="form-label">
              Hobbies
            </label>
          </div>
          <div className="col-10">
            <textarea
              className="form-control"
              placeholder="Enter your hobbies"
              id="hobbies"
              name="hobbies"
              value={user.hobbies}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" onClick={updateUser}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Edit;
