import React from "react";
import { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../utils/axiosInstance";

const recentreport = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await axios.get(
                    "https://community-issue-report-system-1.onrender.com/myissues",
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
            <div className="card p-4">
                <div className="d-flex justify-content-between mb-3">
                    <h5 className="fw-bold">My Recent Reports</h5>
                    <div className=" d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => window.location.href = '/reportissue'}><i className="bi bi-plus"></i> New Report</button>
                        <button className="btn btn-sm btn-outline-success" onClick={() => window.location.href = '/userdashboard'}><i className="bi bi-grid"></i> Dashboard</button>

                    </div>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Search my reports..." />
                </div>
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Issue Details</th>
                            <th>Status</th>
                            <th>Date Submitted</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((issue) => (
                            <tr>
                                <td>
                                    <div className="fw-bold">{issue.title}</div>
                                    <small className="text-muted"><i className="bi bi-geo-alt"></i> {issue.location}</small>
                                </td>
                                <td><span className="status-badge bg-success-subtle text-success">{issue.status}</span></td>
                                <td>{new Date(issue.createdAt).toDateString()}</td>
                                <td><button className="btn btn-sm"><i className="bi bi-pencil"></i></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}
export default recentreport;