
import React from 'react';
import { useState } from 'react';
// import axios from 'axios';
// import axios from 'utils/axiosInstance';
import axios from "../utils/axiosInstance";




const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const endpoint = 'https://community-issue-report-system-1.onrender.com/login'

    const submitDetails = async () => {



        const theemail = document.getElementById("eemail").value;
        const thepassword = document.getElementById("ppassword").value;



        if (theemail === "" || thepassword === "") {
            errorMessage3.style.display = 'block';
            setTimeout(() => {
                errorMessage3.style.display = 'none';
            }, 2000);
            return;
        } else {


            let emailChecked = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let emailValid = emailChecked.test(theemail);

            if (!emailValid) {
                erroremail.style.display = 'block';
                setTimeout(() => {
                    erroremail.style.display = 'none';
                }, 2000);
                return;
            }


            else {

                try {
                    const information = { email, password }
                    const result = await axios.post(
                        endpoint,
                        information,
                        { withCredentials: true }
                    )

                    if (result.status === 200) {

                        // SAVE TOKEN
                        localStorage.setItem("accessToken", result.data.accessToken)

                        const signupbtn = document.getElementById('loginbtn')
                        signupbtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Logging in...`

                        setTimeout(() => {
                            if (result.data.user.role === "admin") {
                                window.location.href = "/admindashboard"
                            } else {
                                window.location.href = "/userdashboard"
                            }
                        }, 1500)
                    }


                }
                catch (err) {

                    if (err.response && err.response.status >= 400) {
                        errorMessage.style.display = 'block';
                        setTimeout(() => {
                            errorMessage.style.display = 'none';
                        }, 2000);
                    }
                }
            }
        }
    }



    return (

        <>


            < div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center" >

                <div className="card shadow-lg p-4 mt-3" style={{ maxWidth: "480px", width: "100%", borderRadius: "20px" }}>
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Welcome Back</h2>
                        <p className="text-muted small">Enter your credentials to manage your community reports</p>
                    </div>

                    <form>
                        <small className=" text-danger " id="errorMessage3" style={{ display: "none" }}>
                            Fill up all the inputs!
                        </small>
                        <div className="mb-3">
                            <label className="form-label fw-bold small">Email Address</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>
                                <input onChange={(e) => { setemail(e.target.value) }} type="email" id='eemail' className="form-control bg-light border-start-0" placeholder="name@example.com" value={email} />

                            </div>
                            <small className="ms-3 text-danger " id="erroremail" style={{ display: "none" }}>
                                enter a valid email address!
                            </small>
                        </div>

                        <div className="mb-3">
                            <div className="d-flex justify-content-between">
                                <label className="form-label fw-bold small">Password</label>
                                <a href="#" className="text-success small text-decoration-none">Forgot password?</a>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-lock"></i></span>
                                <input onChange={(e) => { setpassword(e.target.value) }} type="password" id='ppassword' className="form-control bg-light border-start-0" placeholder="Enter your password" value={password} />

                            </div>
                            <small className="ms-3 text-danger " id="errorMessage" style={{ display: "none" }}>
                                incorrect Password or email!
                            </small>
                        </div>

                        <div className="alert alert-info bg-success-subtle border-0 small d-flex align-items-start py-2">
                            <i className="bi bi-info-circle me-2 mt-1"></i>
                            <span><strong>Admin Login:</strong> Use any valid format. This system is designed for both Citizens and Authorities.</span>
                        </div>

                        <button onClick={submitDetails} id='loginbtn' type="button" className="btn btn-primary-fma w-100 py-3 mb-3 fw-bold">Sign In &rarr;</button>

                        <div className="text-center">
                            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "10px", letterSpacing: "1px" }}>New to FixMyArea?</small>
                            <button type="button" className="btn btn-outline-success w-100 mt-2 py-2 fw-bold"><a href="/signup" className="text-decoration-none text-dark">Create an Account</a></button>
                        </div>
                    </form>
                </div>

                <div className="mt-4 small text-muted d-flex gap-4">
                    <a href="#" className="text-decoration-none text-muted">Privacy Policy</a>
                    <a href="#" className="text-decoration-none text-muted">Terms of Service</a>
                    <a href="#" className="text-decoration-none text-muted">Contact Support</a>
                </div>
            </div >


        </>
    );
};

export default Login;