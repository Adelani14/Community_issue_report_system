import axios from "../utils/axiosInstance";
import { useEffect, useState } from "react";


const AdminRecentReport = () => {


    const [reports, setReports] = useState([]);



    const fetchReports = async () => {

        try {

            const token = localStorage.getItem("accessToken");



            // Fetch recent reports
            const res = await axios.get(
                "http://localhost:5000/adminallissues",
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
                `http://localhost:5000/updateStatus/${id}`,
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
                `http://localhost:5000/deleteIssue/${id}`,
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
         <div className="card p-4">
            <nav classname=" mb-4">
                <div className="d-flex ms-2 justify-content-between mb-3">
                    <h5 className="fw-bold mt-3">All Reports</h5>
                    <div className="me-3 mt-3">
                        <button className="btn btn-sm btn-outline-success" onClick={() => window.location.href = '/admindashboard'}><i className="bi bi-grid"></i> Dashboard</button>
                    </div>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control " placeholder="Search for reports..." />
                </div>
            </nav>
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
            </div>            </>
    );
}

export default AdminRecentReport;