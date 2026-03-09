import React from "react";
import axios from "../utils/axiosInstance";

const UserSidebar = () => {

    const handleLogout = async () => {

        try {

            const token = localStorage.getItem("accessToken");

            await axios.post(
                "http://localhost:5000/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            localStorage.removeItem("accessToken");

            window.location.href = "/login";

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <button className="btn btn-outline-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                <span className="bi bi-list"></span>
            </button>


            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <div className="d-flex align-items-center mb-3 ps-2 gap-2">
                        <i className="bi bi-activity text-success fs-4 me-2"></i>
                        <h5 className="mb-0 fw-bold text-success">FixMyArea</h5>
                    </div>

                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">

                    <ul className="nav flex-column">
                        <li className="nav-item"><a className="nav-link active" href="#"><i className="bi bi-grid me-2"></i> Dashboard</a></li>
                        <li className="nav-item"><a className="nav-link" href="/reportissue"><i className="bi bi-plus-circle me-2"></i> Report Issue</a></li>
                        <li className="nav-item"><a className="nav-link" href="/recentreport"><i className="bi bi-file-text me-2"></i> My Reports</a></li>
                        <li className="nav-item"><a className="nav-link" href="/editprofile"><i className="bi bi-gear me-3"></i> Edit Profile</a></li>
                    </ul>


                    <div className="mt-5 ms-3 bt-3 pt-3">
                        <button  className="nav-link text-danger d-flex align-items-center small" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-left me-3"></i> Logout
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
}
export default UserSidebar;