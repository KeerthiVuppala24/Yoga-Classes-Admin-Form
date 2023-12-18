import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Form() {
  const [user, setUser] = useState({
    name: "",
    email:"",
    phno: "",
    age: "",
    fee:"",
    slot: "",
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [submit, isSubmit] = useState(false);

  function hadleChange(e) {
    const { name, value } = e.target;

    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }

  function submitUser(e) {
    e.preventDefault();
    setError(validate(user));
    isSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      axios
        .post("https://helpful-bass-wig.cyclic.app/", user)
        .then((res) => console.log(res.data));

      setUser({
        name: "",
        email:"",
        phno:"",
        age: "",
        fee: "",
        slot: "",
      });
      setSuccess(true);
    }
  }, [error]);

  const validate = (values) => {
    const errors = {};
    if (!user.name) {
      errors.name = "Name is required!";
    }
    if(!user.email){
        errors.email="Email Id is required";
    }
    if (!user.age) {
      errors.age = "Age is required!";
    } else if (parseInt(user.age) < 18 || parseInt(user.age) > 65) {
      errors.age = "Age must be between 18 and 65 years!";
    }
    if (!user.phno) {
      errors.phno = "Contact is required!";
    } else if (parseInt(user.phno) < 1000000000 || parseInt(user.phno) > 9999999999 || user.phno < "1000000000" || user.phno > "9999999999") {
      errors.phno = "Contact must be equal to 10 digit!";
    }
    if (!user.fee) {
      errors.fee = "Fees is required!";
    } else if (parseInt(user.fee) !== 500) {
      errors.fee = "Fees must be equal to 500!";
    }
    if (!user.slot) {
      errors.slot = "Select a slot!";
    }
    return errors;
  };

  return (
    <div className="box">
      <form autoComplete="off">
        <div className="heading">
          <h1>{success ? "Payment Succesful" : "Admission Form"}</h1>
        </div>
        {!success && (<div className="name">
          <label>Name: </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={user.name}
            onChange={hadleChange}
          ></input>
        </div>)}
        {!success && (<p>{error.name}</p>)}
        {!success && (<div className="email">
          <label>Email Id: </label>
          <input
            type="text"
            placeholder="Enter Email Id"
            name="email"
            value={user.email}
            onChange={hadleChange}
          ></input>
        </div>)}
        {!success && (<p>{error.email}</p>)}
        {!success && (<div className="phno">
          <label>Contact: </label>
          <input
            type="text"
            placeholder="Enter Contact Number"
            name="phno"
            value={user.phno}
            onChange={hadleChange}
          ></input>
        </div>)}
        {!success && (<p>{error.phno}</p>)}
        {!success && (<div className="age">
          <label>Age: </label>
          <input
            type="text"
            placeholder="Enter Age"
            name="age"
            value={user.age}
            onChange={hadleChange}
          ></input>
        </div>)}
        {!success && (<p>{error.age}</p>)}
        {!success && (<div className="fee">
          <label>Fee: </label>
          <input
            type="text"
            placeholder="Enter Amount"
            name="fee"
            value={user.fee}
            onChange={hadleChange}
          ></input>
        </div>)}
        {!success && (<p>{error.fee}</p>)}
        {!success && (<div className="slot">
          <label>Slot: </label>
          <select name="slot" value={user.slot} onChange={hadleChange}>
            <option className="option1">Pick a slot</option>
            <option>6-7 AM</option>
            <option>7-8 AM</option>
            <option>8-9 AM</option>
            <option>5-6 PM</option>
          </select>
        </div>)}
        {!success && (<p>{error.slot}</p>)}
        {!success && (
          <div className="btn">
            <button type="submit" onClick={submitUser}>
              Make Payment <i class="fa-solid fa-indian-rupee-sign"></i>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}