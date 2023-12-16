import { useState } from "react";
import "./LoginPage.css";
import InputButton from "../../components/inputButton/InputButton";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let schema = yup.object().shape({
    password: yup.string().required(),
    email: yup.string().email(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });

  const loginHandler = () => {
    schema
      .isValid({
        email: email,
        password: password,
      })
      .then(function (valid) {
        if (valid) {
          const credntial = JSON.stringify({
            email,
            password: password,
          });

          const ciphertext = CryptoJS.AES.encrypt(credntial, process.env.REACT_APP_ENCRYPTED_KEY).toString();

          const config = {
            headers: {
              apikey: process.env.REACT_APP_API_KEY,
              currency: process.env.REACT_APP_CURRENCY,
            },
          };
          const data = { request_data: ciphertext };
          axios.post(process.env.REACT_APP_BASE_URL + "auth/login", data, config).then((response) => {
            if (response.status === 200 || response.statusText === "OK") {
              localStorage.setItem("user_token", response.data.main_data.data.profile.token);
              navigate("/search-flight");
            }
          });
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <InputButton type="email" label="Email" inputValueHandler={setEmail} />
        <InputButton type="password" label="Password" inputValueHandler={setPassword} />
        <div className="submit-btn mt-3">
          <input className="btn btn-primary " type="submit" value="LOGIN" onClick={loginHandler}></input>
          <div className="forgot-btn">Forgot password?</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
