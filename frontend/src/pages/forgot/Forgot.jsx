import { useState } from "react";
import { Link } from "react-router-dom";
import "./forgot.scss";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  let navigate = useNavigate(); // Navigator
  // State Handler in input feilds
  const [state, setState] = useState(() => {
    return {
      email: "",
    };
  });
  // function to handle the inputs
  function handleInput(event) {
    let { name, value } = event.target;
    console.log(name, value);
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }
  function validateRegistrationInput(data) {
    const registerValidation = Joi.object({
      username: Joi.string().min(3).required(),
      email: Joi.string()
        .min(6)
        .email({ tlds: { allow: false } })
        .required(),
    });
    return registerValidation.validate(data);
  }

  return (
    <div className="register">
      <ToastContainer />
      <div className="card">
        <div className="left">
          
        </div>
        <div className="right">
          <h1>Forgot Password </h1>
          <form>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInput}
            />

            <Link>
              <button
              >
                Reset Password Link in Email
              </button>
            </Link>
          </form>
          <span className="text" style={{color:'black'}} >Do you have an account?</span>
          <Link to="/login">
            <button className="btnn" >Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
