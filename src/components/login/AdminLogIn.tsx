import "./LogIn.css";
import Logo from "../../assets/img/logo.png";
import { useState, FormEvent, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAlertSnack, AlertType } from "../AlertSnack";
import { UseUser } from "../auth/UserContext";
import isLoggedIn from "../auth/CheckUser";
import axios, { AxiosError } from "axios";

interface LoginValidations {
  email: boolean,
  password: boolean
}

interface LoginErrors {
  email: string | null,
  password: string | null
}

function LoginForm() {
  const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
  const changeForm = (admin: boolean) => {
    setIsUserLogin(admin);
  };

  return (
    <div className="main-container">
      <div className="col mx-auto d-flex justify-content-center">
        <div className="login-container card shadow rounded-4 border-0">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <img src={Logo} className="main-logo" />
            </div>
            <div className="col-12">
              <div className="mt-5 mb-3">
                {isUserLogin? <AdminForm changeForm={changeForm}/> : <UserForm changeForm={changeForm}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FormProps {
  changeForm: (admin: boolean) => void;
}

function AdminForm({ changeForm }: FormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState<LoginValidations>({ email: false, password: false }); // For validation performing
  const [errors, setErrors] = useState<LoginErrors>({
    email: null, password: null
  });
  const { setUser } = UseUser();
  const { showAlert } = useAlertSnack();
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z\.]+$/;

    if (email == "") {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return false;
    }

    if (!email.match(emailRegex)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email" }));
      return false;
    }

    setErrors((prev) => ({ ...prev, email: null }));
    return true;
  }

  const validatePassword = () => {
    if (password == "") {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return false;
    }

    setErrors((prev) => ({ ...prev, password: null }));
    return true;
  }

  useEffect(() => {
    let user = isLoggedIn();
    if (user) {
      setUser(user);

      navigate('/'); // Navigate to the dashboard
    }
  }, []);

  useEffect(() => { if (validations.email) validateEmail() }, [email]);
  useEffect(() => { if (validations.password) validatePassword() }, [password]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validate the fields
    const ue = validateEmail();
    const up = validatePassword();

    if(!(ue && up)) return;

    try {
      let response = await axiosInstance.post("/api/login", {
        userName: email,
        password
      });

      const token = response.data.token;
      if (token) {
        // Store the token and user data in cookies
        console.log(response.data);
        let expirationDate = new Date(response.data.expiration);
        Cookies.set('jwtToken', token, { expires: expirationDate });
        Cookies.set('userId', response.data.userId, { expires: expirationDate });
        Cookies.set('userName', response.data.userName, { expires: expirationDate });
        Cookies.set('role', response.data.role, { expires: expirationDate });

        // Set the token in Axios defaults
        let user = isLoggedIn(); // get the user object
        setUser(user); // Set the user in the context

        showAlert("Success", "Login successful", AlertType.success);
        navigate("/");
      }
      else {
        throw new Error("Token not found");
      }
    }
    catch (error) {
      console.log(error);
      if(axios.isAxiosError(error)){
        const axiosError = error as AxiosError;
        if(axiosError.response?.status === 401) {
          showAlert("Error", "Invalid username or password", AlertType.error);
        }
        else{
          showAlert("Error", "Someting went wrong", AlertType.error);
        }
      }
      else{
        showAlert("Error", "Someting went wrong", AlertType.error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="input-uid" className="mb-1">
          Administrator Email
        </label>
        <input
          type="text"
          className="form-control"
          id="input-uid"
          placeholder="Email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setValidations((prev) => ({ ...prev, email: true }));
          }}
          onBlur={() => { validateEmail() }}
        />
        <label htmlFor="input-uid" className="mt-1 text-danger">
          {errors.email}
        </label>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="input-password">Password</label>
        <input
          type="password"
          className="form-control mt-1"
          id="input-password"
          placeholder="******"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setValidations((prev) => ({ ...prev, password: true }));
          }}
          onBlur={() => { validatePassword() }}
        />
        <label htmlFor="input-password" className="text-danger mt-1 mb-4">
          {errors.password}
        </label>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="consent-check"
        />
        <label
          className="form-check-label small fst-italic"
          htmlFor="consent-check"
        >
          By checking this box, you agree to our Terms of Service
          and that we will store and process your personal data in
          accordance with our Privacy Policy.
        </label>
      </div>
      <div className="d-flex">
        <button type="submit" className="btn btn-primary mt-4 btn-login">Log In</button>
        <button type="button" className="btn btn-primary ms-4 mt-4 btn-login"
          onClick={() => { changeForm(false); }}>
            Go to patient login
        </button>
      </div>
    </form>
  )
}

interface UserLoginValidations {
  nic: boolean,
  password: boolean
}

interface UserLoginErrors {
  nic: string | null,
  password: string | null
}

function UserForm({ changeForm }: FormProps) {
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState<UserLoginValidations>({ nic: false, password: false }); // For validation performing
  const [errors, setErrors] = useState<UserLoginErrors>({
    nic: null, password: null
  });
  const { setUser } = UseUser();
  const { showAlert } = useAlertSnack();
  const navigate = useNavigate();

  const validateNIC = () => {
    if (nic == "") {
      setErrors((prev) => ({ ...prev, nic: "Nic is required" }));
      return false;
    }
    if (!nic.match(/^(\d{12}|(V|v)\d{9})$/)) {
      setErrors((prev) => ({ ...prev, nic: "Nic is required" }));
      return false;
    }

    setErrors((prev) => ({ ...prev, nic: null }));
    return true;
  }

  const validatePassword = () => {
    if (password == "") {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return false;
    }

    setErrors((prev) => ({ ...prev, password: null }));
    return true;
  }

  useEffect(() => {
    let user = isLoggedIn();
    if (user) {
      setUser(user);

      navigate('/'); // Navigate to the dashboard
    }
  }, []);

  useEffect(() => { if(validations.nic) validateNIC() }, [nic]);
  useEffect(() => { if(validations.password) validatePassword() }, [password]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validate the fields
    const un = validateNIC();
    const up = validatePassword();

    if(!(un && up)) return;

    try {
      let response = await axiosInstance.post("/api/Login", {
        userName: nic,
        password
      });

      const token = response.data.token;
      if (token) {
        // Store the token and user data in cookies
        console.log(response.data);
        let expirationDate = new Date(response.data.expiration);
        Cookies.set('jwtToken', token, { expires: expirationDate });
        Cookies.set('userId', response.data.userId, { expires: expirationDate });
        Cookies.set('userName', response.data.userName, { expires: expirationDate });
        Cookies.set('role', response.data.role, { expires: expirationDate });

        // Set the token in Axios defaults
        let user = isLoggedIn(); // get the user object
        setUser(user); // Set the user in the context

        showAlert("Success", "Login successful", AlertType.success);
        navigate("/");
      }
      else {
        throw new Error("Token not found");
      }
    }
    catch (error) {
      console.log(error);
      if(axios.isAxiosError(error)){
        const axiosError = error as AxiosError;
        if(axiosError.response?.status === 401) {
          showAlert("Error", "Invalid username or password", AlertType.error);
        }
        else{
          showAlert("Error", "Someting went wrong", AlertType.error);
        }
      }
      else{
        showAlert("Error", "Someting went wrong", AlertType.error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="input-uid" className="mb-1">NIC Number</label>
        <input type="text" className="form-control" id="input-uid" placeholder="Enter your 12 digit NIC number" value={nic}
          onChange={(e) => {
            setNic(e.target.value);
            setValidations((prev) => ({ ...prev, nic: true }));
          }}
          onBlur={() => { validateNIC() }} />
        <label htmlFor="input-uid" className="mt-1 mb-3 text-danger">{errors.nic}</label>
      </div>
      <div className="form-group">
        <label htmlFor="input-password">Password</label>
        <input type="password" className="form-control mt-1" id="input-password" placeholder="Password" value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setValidations((prev) => ({ ...prev, password: true }))
          }}
          onBlur={() => { validatePassword() }} />
        <label htmlFor="input-password" className="mt-1 mb-4 text-danger">{errors.password}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="consent-check" />
        <label className="form-check-label" htmlFor="consent-check">I agree</label>
      </div>
      <div className="d-flex">
        <button type="submit" className="btn btn-primary mt-4 btn-login">Log In</button>
        <button type="button" className="btn btn-primary ms-4 mt-4 btn-login"
          onClick={() => { changeForm(true); }}>
            Go to admin login
        </button>
      </div>
    </form>
  )
}

export default LoginForm;
