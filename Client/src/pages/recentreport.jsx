import React from "react";
import { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../utils/axiosInstance";
import { Link } from "react-router-dom";

const recentreport = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchReports = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);



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

            alert("Report deleted successfully")

            fetchReports(); // refresh table

        } catch (err) {
            console.log(err)
        }

    }



    const [showGallery, setShowGallery] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);



    const openGallery = (issue) => {
        setSelectedIssue(issue);
        setShowGallery(true);
    };

    const closeGallery = () => {
        setShowGallery(false);
        setSelectedIssue(null);
    };


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
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Issue Details</th>
                                <th>Status</th>
                                <th>Date Submitted</th>
                                <th>View</th>
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
                                    <td><span className={"status-badge bg-success-subtle text-success "}>{issue.status}</span></td>
                                    <td>{new Date(issue.createdAt).toDateString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm"
                                            onClick={() => openGallery(issue)}
                                        >
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    </td>
                                    <td><button className="btn btn-sm"><i onClick={() => deleteIssue(issue._id)} className="bi bi-trash"></i></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {showGallery && selectedIssue && (
                    <div
                        className="modal fade show d-block"
                        style={{
                            background: "rgba(0,0,0,.9)",
                            zIndex: 99999,
                        }}
                        onClick={closeGallery}
                    >

                        <div
                            className="modal-dialog modal-fullscreen"
                            onClick={(e) => e.stopPropagation()}
                        >

                            {/* Header */}
                            <div className="d-flex justify-content-between p-4 w-100 ">

                                <div className="">
                                    <h3 className="text-white text-capitalize text-xl font-semibold">
                                        {selectedIssue.title}
                                    </h3>

                                    <p className="text-white text-capitalize text-md">
                                        Location: {selectedIssue.location}
                                    </p>
                                    <p className="text-white text-capitalize text-md">
                                        Description: {selectedIssue.description}
                                    </p>
                                </div>

                                <button
                                    onClick={closeGallery}
                                    className="text-white hover:text-gray-300"
                                >
                                    ✕
                                </button>

                            </div>

                            <div className=" modal-body flex-1 flex items-center justify-content-center relative">

                                <img
                                    src={selectedIssue.imageUrl}
                                    alt={selectedIssue.title}
                                    className="img-fluid"

                                    style={{
                                        maxHeight: "70vh",
                                        objectFit: "contain",
                                    }}
                                />

                            </div>

                        </div>

                    </div>
                )
                }






            </div >

        </>
    );
}
export default recentreport;