import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    hobbies: "",
  });
  const [isChecked, setIsChecked] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const [getUserData, setUserData] = useState([]);
  const getData = async (e) => {
    const res = await fetch("/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 404 || !data) {
      alert(data);
    } else {
      setUserData(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const addUser = async (e) => {
    e.preventDefault();
    const { name, email, phoneNumber, hobbies } = user;
    const res = await fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
        hobbies,
      }),
    });
    const data = await res.json();
    if (res.status === 404 || !data) {
      alert(data);
    } else {
      // alert("Inserted Successfully");
      Navigate("/");
      getData();
    }
  };

  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await res2.json();
    if (res2.status === 404 || !deletedata) {
      alert("Error Occured");
    } else {
      alert("Deleted Successfully");
      getData();
    }
  };

  const handleCheck = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsChecked([...isChecked,  value]);
    } else {
      setIsChecked(isChecked.filter((e) => e !== value));
    }
  };

  const sendEmail = async () => {
    const res = await fetch("/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(isChecked)
    });
    const data = await res.json();
    if (res.status === 404 || !data) {
      alert(data);
    } else {
      alert("Email Send Successfully");
      Navigate("/");
    }
  };

  return (
    <div className="mt-3">
      <div className="container">
        <div className="add_btn mt-2 mb-3">
          <button
            type="button"
            className="btn btn-info mx-3"
            onClick={sendEmail}
          >
            <i className="fa-sharp fa-solid fa-share"></i> Send
          </button>
          <button
            type="button"
            className="btn btn-info mx-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={handleShow}
          >
            <i className="fa-solid fa-plus"></i> Add User
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            show={show}
            onHide={handleClose}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add User
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
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

                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={addUser}
                      >
                        Add User
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">Select</th>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Hobbies</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {getUserData.map((element, id) => {
              return (
                <tr key={id}>
                  <th scope="row">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={element._id}
                      checked={element.isChecked}
                      onChange={(e) => handleCheck(e)}
                    />
                  </th>
                  {console.log(element._id)}
                  <td>{id + 1}</td>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.phoneNumber}</td>
                  <td>{element.hobbies}</td>
                  <td className="d-flex justify-content-between">
                    <Link to={`view/${element._id}`}>
                      <button type="button" className="btn btn-success">
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </Link>
                    <Link to={`edit/${element._id}`}>
                      <button type="button" className="btn btn-primary">
                        <i className="fa-sharp fa-solid fa-pen"></i>
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteuser(element._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
