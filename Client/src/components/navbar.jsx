
import React from 'react';
// import { Activity } from 'lucide-react';
import Sidebar from './usersidebar';

function navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 ">
                <div className="container">
                    <a className="navbar-brand fw-bold fs-3 text-success" href="#"> <i className="bi bi-activity"></i> FixMyArea</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navMenu">
                        <div className="ms-auto">
                            <ul className="navbar-nav ms-auto me-3 gap-3 mt-2">
                                <button className="btn btn-outline-success me-2 "><a href='/login' className="text-decoration-none nav-link  fw-semibold small text-dark">Login</a></button>
                                <button className="btn btn-primary-fma btn-sm px-3">Report an Issue</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>



        </>
    );
}
export default navbar;
