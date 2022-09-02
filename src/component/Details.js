import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams("");
  const navigate = useNavigate();
  const [getUserData, setUserData] = useState([]);
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
      setUserData(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteuser = async(id) =>{
    const res2 = await fetch(`/deleteuser/${id}`, {
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await res2.json();
    if(res2.status === 404 || !deletedata){
      alert("Error Occured");
    }
    else{
      // alert("Deleted Successfully");
      navigate("/");
      getData();
    }
  }
  return (
    <div className="container mt-3">
      <h2>Welcome {getUserData.name}</h2>
      <div className="card w-50 mt-3">
        <div className="card-header d-flex ">
          <h5 className="mr-auto p-2">Details</h5>
          <div >
            <Link to={`/edit/${getUserData._id}`} className="btn btn-primary mx-3">
              <i className="fa-sharp fa-solid fa-pen"></i>
            </Link>
            <button type="button" className="btn btn-danger mx-3" onClick={()=>deleteuser(getUserData._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">Name : {getUserData.name}</p>
          <p className="card-text">Email : {getUserData.email}</p>
          <p className="card-text">Number : {getUserData.phoneNumber}</p>
          <p className="card-text">Hobbies : {getUserData.hobbies}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
