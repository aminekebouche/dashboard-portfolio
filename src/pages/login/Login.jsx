import React, { useContext, useEffect, useState } from "react";
import "./login.scss";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import app from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import validator from "validator";
import { AuthContext } from "../../context/AuContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  var auth = getAuth(app);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async () => {
    console.log(inputs);
    const allFieldsFilled = Object.values(inputs).every((val) => val !== "");
    if (allFieldsFilled && validator.isEmail(inputs.email)) {
      try {
        await setPersistence(auth, browserLocalPersistence);
        const userLog = await signInWithEmailAndPassword(
          auth,
          inputs.email,
          inputs.password
        );

        console.log(userLog);
        if (userLog) {
          setMessage({ status: "success", text: "Vous etes connecté!" });
          setUser(true);

          navigate("/");
        } else {
          setMessage({ status: "error", text: "Password or email incorrect!" });
        }
      } catch (error) {
        console.log(error.message);
        setMessage({ status: "error", text: error.message });
      }
    } else {
      setMessage({ status: "error", text: "Adress mail not valid" });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
      console.log("YELLA");
    } else {
      console.log("OULACH");
    }
  }, [user, navigate]);

  return (
    <div className="login">
      <div className="container">
        <h1>Login</h1>
        <div className="inputs">
          <PersonIcon />
          <input
            type="email"
            placeholder="Type your email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputs">
          <LockIcon />
          <input
            type="password"
            placeholder="Type your password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        {message && (
          <div className={`message ${message.status}`}>{message.text}</div>
        )}
        <section className="">
          <h5>Don't you have an account?</h5>
          <h6>
            Please contact the{" "}
            <a href="mailto:keboucheamine6@gmail.com">admin</a>
          </h6>
        </section>
      </div>
    </div>
  );
};

export default Login;
