import { NavLink } from "react-router-dom";
// import Axios from "../utils/axiosInstance.js";
// import { useState, useEffect } from "react";


function MobileBottomNav() {


    return (
        <>
            <nav className="mobile-bottom-nav d-md-none">
                <NavLink to="/userdashboard" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-house fs-5"></i>
                    <small>Home</small>
                </NavLink>

                <NavLink to="/reportissue" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-plus fs-5"></i>
                    <small>New</small>
                </NavLink>

                <NavLink to="/recentreport" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-list fs-5"></i>
                    <small>Reports</small>
                </NavLink>




                <NavLink to="/allproducts" className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }>
                    <i className="bi bi-person fs-5"></i>
                    <small>Profile</small>
                </NavLink>

            </nav>
        </>
    );
}

export default MobileBottomNav;