import React from "react";
import UserSidebar from "../components/usersidebar";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const UserDashboard = () => {
    //dashboardstats
    const [dashboardStats, setDashboardStats] = useState({
        total: 0,
        pending: 0,
        resolved: 0
    });
    const [user, setUser] = useState({});
    const [reports, setReports] = useState([]);
    const [userFirstname, setUserFirstname] = useState("");

    useEffect(() => {

        const fetchReports = async () => {

            try {

                const token = localStorage.getItem("accessToken");

                // GET USER PROFILE
                const profileRes = await axios.get(
                    "https://community-issue-report-system-1.onrender.com/myprofile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    }
                );

                setUser(profileRes.data);
                setUserFirstname(profileRes.data.firstname);

                // Fetch dashboard stats
                const dashboardRes = await axios.get(
                    "https://community-issue-report-system-1.onrender.com/dashboardstats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    }
                );

                setDashboardStats(dashboardRes.data);

                // Fetch reports
                const res = await axios.get(
                    "https://community-issue-report-system-1.onrender.com/mylimitedissues",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    }
                );

                setReports(res.data);

            } catch (error) {
                console.log(error);
            }

        };

        fetchReports();

    }, []);





    return (

        <>
            <div className="container-fluid" >

                <div className="main-content w-100">
                    <header className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <div className="d-flex align-items-center mb-4 ps-2 gap-2">
                                <UserSidebar />
                                <h5 className="mb-0 fw-bold text-success">FixMyArea</h5>
                            </div>
                            <p className="text-muted">Welcome back, {userFirstname}. Here's what's happening.</p>
                        </div>
                        <div className="align-items-center">
                            <button className="btn btn-success"><i className="bi bi-plus-circle me-2"></i><a href="/reportissue" className="text-white text-decoration-none">New Report</a></button>
                            <img
                                src={user.profileImage ? user.profileImage : "/p1.jpg"}
                                className="avatar-img ms-2"
                                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                alt="Profile"
                            />
                        </div>
                    </header>

                    <div className="row g-4 mb-4">


                        <div className="col-md-4">
                            <div className="card stat-card" style={{ borderLeft: "5px solid #3b82f6" }}>
                                <small className="text-muted">Total Reports</small>
                                <h2 className="fw-bold">{dashboardStats.total}</h2>
                                <span className="text-primary small">+2 from last week</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card stat-card" style={{ borderLeft: "5px solid #f59e0b" }}>
                                <small className="text-muted">Pending Issues</small>
                                <h2 className="fw-bold">{dashboardStats.pending}</h2>
                                <span className="text-warning small">3 marked as urgent</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card stat-card" style={{ borderLeft: "5px solid #10b981" }}>
                                <small className="text-muted">Resolved</small>
                                <h2 className="fw-bold">{dashboardStats.resolved}</h2>
                                <span className="text-success small">82% resolution rate</span>
                            </div>
                        </div>
                    </div>

                    <div className="#">
                        <div className="d-flex justify-content-between mb-3">
                            <h5 className="fw-bold">My Recent Reports</h5>
                            <a href="/recentreport" className="text-success text-decoration-none small">View All Reports &rarr;</a>
                        </div>
                        <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Issue Details</th>
                                    <th>Status</th>
                                    <th>Date Submitted</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((issue) => (

                                    <tr key={issue._id}>

                                        <td>
                                            <div className="fw-bold">{issue.title}</div>
                                            <small className="text-muted"><i className="bi bi-geo-alt"></i> {issue.location}</small>
                                        </td>
                                        <td><span className="status-badge bg-success-subtle text-success">{issue.status}</span></td>
                                        <td>{new Date(issue.createdAt).toDateString()}</td>
                                        <td><button className="btn btn-sm"><i className="bi bi-image"></i><a href={`${issue.imageUrl}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark ms-1">View</a></button></td>
                                        <td><button className="btn btn-sm"><i className="bi bi-eye"></i></button></td>
                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </>



    );
}
export default UserDashboard;

