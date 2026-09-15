import React from "react";
import { useState, useEffect } from "react";
import Axios from "../utils/axiosInstance.js";
import MobileBottomNav from "../components/MobileBottomNav.jsx";
import { Link } from "react-router-dom";


const Account = () => {


    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lasttname, setLasttname] = useState("");
    const [user, setUser] = useState("");

    const getUsername = async () => {
        try {
            const res = await Axios.get("/myprofile",);

            setFullName(res.data?.user?.fullName || "");
            setUser(res.data);
            setFirstname(res.data.firstname);
            setLasttname(res.data.lastname);
            setEmail(res.data?.email || "");
            if (res.data.role === "admin") {
                setIsAdmin(true);
            }
        } catch (error) {
            console.log(error);
        }
    };



    const logout = async () => {
        setLoading(true);
        try {
            await Axios.post("/logout");

            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");

            window.location.href = "/login";
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsername();
    }, [])

    return (
        <>
            {loading && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.25)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        zIndex: 9999,
                    }}
                >
                    <div className="position-relative d-inline-flex justify-content-center align-items-center">
                        <i
                            className="spinner-border text-success"
                            style={{ fontSize: "2.5rem" }}
                        ></i>

                        <div
                            className="spinner-border spinner-border-sm text-light position-absolute"
                            style={{
                                width: "1.3rem",
                                height: "1.3rem",
                            }}
                        ></div>
                    </div>
                </div>
            )}



            <div className="container mt-2 mb-5">

                <div className="row g-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm rounded-4">
                        <div className="card-body">

                            <div className="d-flex justify-content-between">
                                <h5>
                                    <i className="bi bi-person me-2 text-success"></i>
                                    Account Details
                                </h5>

                                <i className="bi bi-pencil text-success"></i>
                            </div>

                            <hr />

                            <div className="fw-bold text-capitalize text-xl">
                                {firstname} {lasttname}
                            </div>

                            <p className="text-muted mb-0">
                                {email}
                            </p>

                        </div>
                        <div className="row g-4">
                            <ul className="list-group  ">
                                {isAdmin && (
                                    <li className="list-group-item">
                                        <Link to="/admindashboard" className="text-decoration-none text-dark">
                                            <i className="bi bi-house me-2"></i>
                                            Admin Dashboard
                                        </Link>
                                    </li>
                                )}
                                <li className="list-group-item">
                                    <Link to="/userdashboard" className="text-decoration-none text-dark">

                                        <i className="bi bi-house me-2 text-success"></i>
                                        Dashboard
                                    </Link>
                                </li>
                                <Link to="/reportissue" className="text-decoration-none text-dark">

                                    <li className="list-group-item">
                                        <i className="bi bi-plus me-2 text-success"></i>
                                        New Report
                                    </li>
                                </Link>

                                <li className="list-group-item">
                                    <Link to="/recentreport" className="text-decoration-none text-dark">

                                        <i className="bi bi-list me-2 text-success"></i>
                                        Reports
                                    </Link>
                                </li>


                            </ul>
                        </div>
                    </div>





                    <div className="col-12 mb-5">

                        <button
                            onClick={logout}
                            className="btn btn-danger rounded-pill px-5 py-2"
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Sign Out
                        </button>

                    </div>
                </div>
            </div >
            <MobileBottomNav />
        </>
    );
};

export default Account;