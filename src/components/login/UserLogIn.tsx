import './LogIn.css';
import Logo from '../../assets/img/logo.png'
import axiosInstance from '../../axiosInstance';
import { FormEvent, useEffect, useState } from 'react';
import isLoggedIn from '../auth/CheckUser';
import { AlertType, useAlertSnack } from '../AlertSnack';
import Cookies from "js-cookie";
import { UseUser } from '../auth/UserContext';
import { useNavigate } from 'react-router-dom';

interface LoginValidations {
    nic: boolean,
    password: boolean
}

interface LoginErrors {
    nic: string | null,
    password: string | null
}

function UserLogIn() {
    const [nic, setNic] = useState("");
    const [password, setPassword] = useState("");
    const [validations, setValidations] = useState<LoginValidations>({ nic: false, password: false }); // For validation performing
    const [errors, setErrors] = useState<LoginErrors>({
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
        if(! nic.match(/^(\d{12}|(V|v)\d{9})$/)){
            setErrors((prev) => ({ ...prev, nic: "Nic is required" }));
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

    useEffect(() => { if (validations.nic) validateNIC() }, [nic]);
    useEffect(() => { if (validations.password) validatePassword() }, [password]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Validate the fields

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
            showAlert("Error", "Someting went wrong", AlertType.error);
        }
    };

    return (
        <div className='main-container'>
            <div className="col mx-auto d-flex justify-content-center">
                <div className="login-container card shadow rounded-4 border-0">
                    <div className='login-container'>
                        <div className='row'>
                            <div className='col-12 d-flex justify-content-center'>
                                <img src={Logo} className='main-logo' />
                            </div>
                            <div className='col-12'>
                                <div className="mt-5 mb-3">
                                    <form onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="input-uid" className="mb-1">NIC Number</label>
                                            <input type="text" className="form-control" id="input-uid" placeholder="Enter your 12 digit NIC number" value={nic}
                                            onChange={(e) => {
                                                setNic(e.target.value);
                                                setValidations((prev) => ({...prev, nic: true}));
                                            }}
                                            onBlur={() => {validateNIC()}}/>
                                            <label htmlFor="input-uid" className="mt-1 mb-3">{errors.nic}</label>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="input-password">Password</label>
                                            <input type="password" className="form-control mt-1" id="input-password" placeholder="Password" value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setValidations((prev) => ({...prev, password: true}))
                                            }}
                                            onBlur={() => {validatePassword()}}/>
                                            <label htmlFor="input-password mt-1 mb-4">{errors.password}</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="consent-check" />
                                            <label className="form-check-label" htmlFor="consent-check">I agree</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-4 btn-login">Log In</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLogIn;
