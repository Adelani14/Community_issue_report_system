import React from "react";
import AdminSidebar from "../components/adminsidebar";
import { useEffect, useState } from "react";
// import axios from "axios";
// import axios from "utils/axiosInstance";
// import axios from "../../utils/axiosInstance"
import axios from "../utils/axiosInstance";

const admindashboard = () => {

    const [dashboardStats, setDashboardStats] = useState({
        total: 0,
        pending: 0,
        Progress: 0,
        resolved: 0
    });

    const [user, setUser] = useState(null)
    const [reports, setReports] = useState([]);
    const [userFirstname, setUserFirstname] = useState("");
    // const [changeStatus, setChangeStatus] = useState("");





    useEffect(() => {

        const Reports = async () => {

            try {

                const token = localStorage.getItem("accessToken");

                // fetch user firstname 
                const userRes = await axios.get(
                    "https://community-issue-report-system-1.onrender.com/firstname",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    }
                );
                setUserFirstname(userRes.data);

                // fetch user profile
                const profileRes = await axios.get(
                    "https://community-issue-report-system-1.onrender.com/adminprofile",

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setUser(profileRes.data)


                // Fetch admin dashboard stats
                const dashboardRes = await axios.get(
                    "https://community-issue-report-system-1.onrender.com/admindashboardstats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    }
                );
                setDashboardStats(dashboardRes.data);

            } catch (error) {
                console.error("Error fetching reports:", error);
            }


        };

        Reports()
    }, []);

    const fetchReports = async () => {

        try {

            const token = localStorage.getItem("accessToken");



            // Fetch recent reports
            const res = await axios.get(
                "https://community-issue-report-system-1.onrender.com/adminallissueslimit",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            setReports(res.data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }


    };

    fetchReports()

    // Function to change issue status
    const changeStatus = async (id, newStatus) => {

        try {

            const token = localStorage.getItem("accessToken")

            await axios.put(
                `https://community-issue-report-system-1.onrender.com/updateStatus/${id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            alert("Status updated")
            fetchReports()

        } catch (err) {
            console.log(err)
        }

    }

    // Function to delete issue
    const deleteIssue = async (id) => {

        try {

            const confirmDelete = window.confirm("Are you sure you want to delete this report?")

            if (!confirmDelete) return

            const token = localStorage.getItem("accessToken")

            await axios.delete(
                `https://community-issue-report-system-1.onrender.com/deleteIssue/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert("Report deleted")

            fetchReports() // refresh table

        } catch (err) {
            console.log(err)
        }

    }


    return (

        <>

            <div className="main-content w-100">



                <header className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <div className="d-flex align-items-center mb-4 ps-2 gap-2">
                            <AdminSidebar />
                            <h5 className="mb-0 fw-bold text-success">FixMyArea</h5>
                        </div>
                        <p className="text-muted small">Global overview of community reports and infrastructure status.</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className=" align-items-center fw-bold text-success fs-4">
                            <img
                                src={user && user.profileImage ? user.profileImage : "p1.jpg"}
                                className="avatar-img ms-2"
                                style={{ width: "47px", height: "45px", borderRadius: "50%" }}
                                alt="Profile"
                                width="50"
                            />
                        </div>
                    </div>
                </header>

                <div className="row g-4 mb-4">
                    <div className="col-md-3">
                        <div className="admin-card stat-card p-3 border-start border-primary border-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <small className="text-muted fw-bold">Total Issues</small>
                                    <h3 className="fw-bold my-1">{dashboardStats.total}</h3>
                                    <small className="text-success small">+12% vs last month</small>
                                </div>
                                <div className="bg-primary-subtle p-2 rounded text-primary"><i className="bi bi-bar-chart-line"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="admin-card stat-card p-3 border-start border-warning border-4">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <small className="text-muted fw-bold">Pending</small>
                                    <h3 className="fw-bold my-1">{dashboardStats.pending}</h3>
                                    <small className="text-danger small">-5% vs last month</small>
                                </div>
                                <div className="bg-warning-subtle p-2 rounded text-warning"><i className="bi bi-clock"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="admin-card stat-card p-3 border-start border-info border-4">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <small className="text-muted fw-bold">Progress</small>
                                    <h3 className="fw-bold my-1">{dashboardStats.Progress}</h3>
                                    <small className="text-info small">+8% vs last month</small>
                                </div>
                                <div className="bg-info-subtle p-2 rounded text-info"><i className="bi bi-gear"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="admin-card stat-card p-3 border-start border-success border-4">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <small className="text-muted fw-bold">Resolved</small>
                                    <h3 className="fw-bold my-1">{dashboardStats.resolved}</h3>
                                    <small className="text-success small">+24% vs last month</small>
                                </div>
                                <div className="bg-success-subtle p-2 rounded text-success"><i className="bi bi-check-circle"></i></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="admin-card p-3 mb-4">
                    <div className="row g-3">
                        <div className="col-md-5">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text bg-white border-end-0 text-muted"><i className="bi bi-search"></i></span>
                                <input type="text" className="form-control border-start-0" placeholder="Search issues, users or locations..." />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-outline-secondary btn-sm w-100"><i className="bi bi-sliders me-2"></i>More Filters</button>
                        </div>
                        <div className="col-md-2 ms-auto">
                            <select className="form-select form-select-sm"><option>All Statuses</option></select>
                        </div>
                        <div className="col-md-2 text-end">
                            <select className="form-select form-select-sm"><option>All Types</option></select>
                        </div>
                    </div>
                </div>

                <div className="admin-card overflow-hidden mb-4">
                    <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-white">
                        <h6 className="fw-bold mb-0">Recent Reports</h6>
                        <a href="/adminrecentreport" className="text-success small fw-bold text-decoration-none">View all reports</a>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th className="ps-4">User / Reporter</th>
                                    <th>Issue Details</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Image</th>
                                    <th className="text-end pe-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="small text-dark">
                                {reports.map((issue) => (

                                    <tr key={issue._id}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center">
                                                <img src={issue.reportedBy.profileImage} className="avatar-img me-2" style={{ width: "40px", height: "40px", borderRadius: "50%" }} alt="User Avatar" />
                                                <div><div className="fw-bold">{issue.reportedBy.firstname} {issue.reportedBy.lastname}</div><div className="text-muted" style={{ fontSize: "0.7rem" }}>{issue.reportedBy.email}</div></div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="fw-bold">{issue.title}</div>
                                            <div className="text-muted" style={{ fontSize: "0.7rem" }}>{issue.description}</div>
                                        </td>
                                        <td><i className="bi bi-geo-alt text-success me-1"></i> {issue.location}</td>
                                        <td><span className=" status-badge bg-success-subtle text-success rounded-pill px-3 py-1">{issue.status}</span></td>
                                        <td><button className="btn btn-sm"><i className="bi bi-image"></i><a href={`${issue.imageUrl}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark ms-1">View</a></button></td>
                                        <td className="text-end pe-4">
                                            <select
                                                value={issue.status}
                                                onChange={(e) => changeStatus(issue._id, e.target.value)}
                                            >

                                                <option value="Pending">Pending</option>
                                                <option value="Progress">Progress</option>
                                                <option value="Resolved">Resolved</option>

                                            </select>
                                            <button className="btn btn-sm"><i className="bi bi-trash" onClick={() => deleteIssue(issue._id)}></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-3 bg-light border-top d-flex justify-content-between align-items-center small">
                        <span className="text-muted">Showing 5 of 1,284 issues</span>
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                                <li className="page-item"><a className="page-link text-dark" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-7">
                        <div className="admin-card p-4 h-100">
                            <h6 className="fw-bold mb-1">Response Time Trend</h6>
                            <p className="text-muted small mb-5">Average time from report to resolution.</p>
                            <div className="d-flex flex-column align-items-center justify-content-center text-muted" style={{ height: '150px' }}>
                                <i className="bi bi-bar-chart-steps fs-1 mb-2 opacity-25"></i>
                                <p className="font-italic">Analytics visualization placeholder</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="admin-card p-4 h-100">
                            <h6 className="fw-bold mb-1">Critical Hotspots</h6>
                            <p className="text-muted small mb-4">Areas with the highest concentration of reports.</p>
                            <div className="hotspot-list">
                                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <span className="small"><i className="bi bi-circle-fill text-danger me-2" style={{ fontSize: '0.5rem' }}></i> Downtown Core</span>
                                    <span className="badge bg-light text-dark fw-normal">42 Reports</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <span className="small"><i className="bi bi-circle-fill text-warning me-2" style={{ fontSize: '0.5rem' }}></i> Oak Ridge</span>
                                    <span className="badge bg-light text-dark fw-normal">18 Reports</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center py-2">
                                    <span className="small"><i className="bi bi-circle-fill text-info me-2" style={{ fontSize: '0.5rem' }}></i> River Side</span>
                                    <span className="badge bg-light text-dark fw-normal">12 Reports</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-5 text-center text-muted small py-4">
                    © 2026 FixMyArea. All rights reserved.
                </footer>
            </div>

        </>
    );
};
export default admindashboard