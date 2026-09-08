import React from "react";
import { useState } from "react";
import axios from "../utils/axiosInstance";

const Signup = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [notfilled, setNotfilled] = useState(false)
    const [notmatch, setNotmatch] = useState(false)
    const [notvalid, setNotvalid] = useState(false)
    const [strongpass, setStrongpass] = useState(false)
    const [firstnameinvalid, setFirstnameinvalid] = useState(false)
    const [lastnameinvalid, setLastnameinvalid] = useState(false)

    const endpoint = 'https://community-issue-report-system-1.onrender.com/signup'
    const submitDetails = () => {



        const thefirstname = document.getElementById("ffirstname").value;
        const thelastname = document.getElementById("llastname").value;
        const theemail = document.getElementById("eemail").value;
        const thepassword = document.getElementById("ppassword").value;
        const Cpassword = document.getElementById("Cpass").value;


        if (thefirstname === "" || thelastname === "" || theemail === "" || thepassword === "" || Cpassword === "") {
            setNotfilled(true)
            setTimeout(() => {
                setNotfilled(false)
            }, 2000);
            return;
        } else {


            let nameChecked = /^[A-Za-z]{2,30}$/;
            let PassChecked = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            let emailChecked = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let emailValid = emailChecked.test(theemail);

            if (!emailValid) {
                setNotvalid(true)
                setTimeout(() => {
                    setNotvalid(false)
                }, 2000);
                return;
            }
            let FirstNameValid = nameChecked.test(thefirstname);
            let LastNameValid = nameChecked.test(thelastname);
            if (!FirstNameValid) {
                setFirstnameinvalid(true)
                setTimeout(() => {
                    setFirstnameinvalid(false)
                }, 2000);
                return;

            }
            if (!LastNameValid) {
                setLastnameinvalid(true)
                setTimeout(() => {
                    setLastnameinvalid(false)
                }, 2000);
                return;

            }


            let PassValid = PassChecked.test(thepassword);
            if (!PassValid) {
                setStrongpass(true)
                setTimeout(() => {
                    setStrongpass(false)
                }, 2000);
                return;
            } else {

                if (thepassword !== Cpassword) {

                    setNotmatch(true)
                    setTimeout(() => {
                        setNotmatch(false)
                    }, 2000);
                } else {
                    errorMessage.style.display = 'none';





                    const information = { email, password, firstname, lastname }
                    axios.post(endpoint, information)
                        .then((result) => {
                            // console.log(result);
                            if (result.status === 201) {
                                const signupbtn = document.getElementById('signupbtn')
                                signupbtn.innerHTML = `<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing up...`

                                setTimeout(() => {
                                    window.location.href = '/login'
                                }, 1500)

                            } else if (result.status === 200) {
                                alert('User already exists')
                                // window.location.href = '/login'
                            } else {
                                alert('status error')
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            }
        }
    }

    return (
        <>


            < div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center" >

                <div className="card shadow-lg p-4 mt-3" style={{ maxWidth: "480px", width: "100%", borderRadius: "20px" }}>
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Create Account</h2>
                        <p className="text-muted small">Enter your credentials to manage your community reports</p>
                    </div>

                    <form>

                        <div className="mb-3">
                            <label className="form-label fw-bold small">First Name</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-person"></i></span>
                                <input onChange={(e) => { setfirstname(e.target.value) }} type="text" id="ffirstname" className="form-control bg-light border-start-0" placeholder="Enter your first name" value={firstname} />
                            </div>
                            {firstnameinvalid && (

                                <small className="ms-3 d-flex text-danger ">
                                    <i className="bi bi-info-circle me-1 fs-8 text-danger"></i>invalid first name entered
                                </small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold small">Last Name</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-person"></i></span>
                                <input onChange={(e) => { setlastname(e.target.value) }} type="text" id="llastname" className="form-control bg-light border-start-0" placeholder="Enter your last name" value={lastname} />
                            </div>
                            {lastnameinvalid && (

                                <small className="ms-3 d-flex text-danger ">
                                    <i className="bi bi-info-circle me-1 fs-8 text-danger"></i>invalid last name entered
                                </small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small">Email Address</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>
                                <input onChange={(e) => { setemail(e.target.value) }} type="email" id="eemail" className="form-control bg-light border-start-0" placeholder="name@example.com" value={email} />

                            </div>
                            {notvalid && (

                                <small className="ms-3 d-flex text-danger ">
                                    <i className="bi bi-info-circle me-1 fs-8 text-danger"></i> enter a valid email address
                                </small>
                            )}
                        </div>

                        <div className="mb-3">
                            <div className="d-flex justify-content-between">
                                <label className="form-label fw-bold small">Password</label>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-lock"></i></span>
                                <input onChange={(e) => { setpassword(e.target.value) }} type="password" id="ppassword" className="form-control bg-light border-start-0" placeholder="Enter your password" value={password} />

                            </div>
                        </div>
                        {/* confirm password */}
                        <div className="mb-3">
                            <div className="d-flex justify-content-between">
                                <label className="form-label fw-bold small">Confirm Password</label>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-lock"></i></span>
                                <input type="password" id="Cpass" className="form-control bg-light border-start-0" placeholder="Confirm your password" />
                            </div>
                            {notmatch && (
                                <small className="ms-3 text-danger d-flex">
                                    <i className="bi bi-info-circle me-1 fs-8 text-danger"></i>
                                    password do not match
                                </small>
                            )}
                            {strongpass && (
                                <small className="ms-3 text-danger d-flex">
                                    <i className="bi bi-info-circle me-1 fs-8 text-danger"></i>
                                    enter a strong Password
                                </small>
                            )}
                        </div>


                        {notfilled && (
                            <div className="alert alert-info border-0 bg-danger-subtle d-flex align-items-center" role="alert">
                                <i className="bi bi-info-circle me-3 fs-4 text-danger"></i>
                                <div className="small text-dark">
                                    Please fill in all the requred fields.
                                </div>
                            </div>
                        )}
                        <button onClick={submitDetails} type="button" className="btn btn-primary-fma w-100 py-3 mb-3 fw-bold" id="signupbtn">Sign up &rarr;</button>

                        <div className="text-center">
                            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "10px", letterSpacing: "1px" }}>Already have an account?</small>
                            <button type="button" className="btn btn-outline-success w-100 mt-2 py-2 fw-bold"><a href="/login" className="text-decoration-none text-dark">Sign In</a></button>
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

export default Signup;