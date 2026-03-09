import { useState } from "react";
// import axios from "axios";
// import axios from "utils/axiosInstance";
import axios from "../utils/axiosInstance";

const reportissue = () => {
    const [mediafile, setmediafile] = useState(null)
    const [title, setTitle] = useState("");
    const [issuetype, setIssuetype] = useState("");
    const [priority, setPriority] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const url = 'http://localhost:5000/upload'



    const SubmitReport = () => {


        const formData = new FormData();

        formData.append("image", mediafile[0]);
        formData.append("date", new Date().toLocaleDateString());
        formData.append("title", title);
        formData.append("issueType", issuetype);
        formData.append("priority", priority);
        formData.append("description", description);
        formData.append("location", location);

        const token = localStorage.getItem("accessToken");

        axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        })

            .then((result) => {
                if (result.status === 201) {
                    const signupbtn = document.getElementById('submitbtn')
                    signupbtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Submitting...`
                    setTimeout(() => {
                        alert('Issue reported successfully')
                        window.location.href = '/userdashboard'
                    }, 1500)
                    console.log(result.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });


    }











    return (
        <>

            <div className="container p-3" style={{ maxWidth: '900px' }}>
                <div className="mb-4 ">
                    <span className="badge bg-success-subtle text-success mb-2">Step 1 of 1 | Issue Reporting Form</span>
                    <h2 className="fw-bold">Report a New Issue</h2>
                    <p className="text-muted">Provide as much detail as possible to help city officials identify and resolve the problem quickly.</p>
                </div>

                <div className="card p-4 shadow-sm border-0">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="title" className="form-label fw-bold small">Issue Title <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div className="form-text">Keep it short and descriptive (e.g., 'Broken Pothole on Main St')</div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <label htmlFor="issuetype" className="form-label fw-bold small">Issue Type <span className="text-danger">*</span></label>
                                <select
                                    id="issuetype"
                                    className="form-select form-select-lg"
                                    onChange={(e) => setIssuetype(e.target.value)}
                                >
                                    <option value="">Select Issue Type</option>
                                    <option value="Waste Management">Waste Management</option>
                                    <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                                    <option value="Public Safety">Public Safety</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="priority" className="form-label fw-bold small">Priority Level (Optional)</label>
                                <div className="btn-group w-100" role="group">

                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="priority"
                                        id="priorityLow"
                                        value="Low"
                                        checked={priority === "Low"}
                                        onChange={(e) => setPriority(e.target.value)}
                                    />
                                    <label className="btn btn-outline-secondary" htmlFor="priorityLow">Low</label>

                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="priority"
                                        id="priorityMedium"
                                        value="Medium"
                                        checked={priority === "Medium"}
                                        onChange={(e) => setPriority(e.target.value)}
                                    />
                                    <label className="btn btn-outline-secondary" htmlFor="priorityMedium">Medium</label>

                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="priority"
                                        id="priorityHigh"
                                        value="High"
                                        checked={priority === "High"}
                                        onChange={(e) => setPriority(e.target.value)}
                                    />
                                    <label className="btn btn-outline-secondary" htmlFor="priorityHigh">High</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="form-label fw-bold small">Description <span className="text-danger">*</span></label>
                            <textarea
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="location" className="form-label fw-bold small">Exact Location <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text bg-white"><i className="bi bi-geo-alt"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <button className="btn btn-link text-success text-decoration-none fw-bold small" type="button">Use GPS</button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="mediafile" className="form-label fw-bold small">Upload Evidence</label>
                            <div className="border border-2 border-dashed rounded-3 p-5 text-center bg-light">
                                <i className="bi bi-cloud-arrow-up display-5 text-muted"></i><br></br>
                                <input type="file" id="mediafile" className="w-25 " onChange={(e) => { setmediafile(e.target.files) }} />

                                <p className="mb-0 mt-2 fw-bold">Click or drag photo to upload</p>
                                <small className="text-muted">PNG, JPG or GIF max of 10MB</small>
                            </div>
                        </div>

                        <div className="alert alert-info border-0 bg-success-subtle d-flex align-items-center" role="alert">
                            <i className="bi bi-info-circle me-3 fs-4 text-success"></i>
                            <div className="small text-dark">
                                <strong>Privacy & Safety Note:</strong> Your report will be public. Please ensure no personal data (like house numbers or faces) is visible in the photos.
                            </div>
                        </div>

                        <div className="d-flex gap-3 mt-4">
                            <button onClick={SubmitReport} id="submitbtn" type="button" className="btn btn-primary-fma btn-lg flex-grow-1 py-3">Submit Report</button>
                            <button className="btn btn-outline-secondary btn-lg flex-grow-1 py-3"> <a href="/userdashboard">Cancel</a></button>

                        </div>
                    </form>
                </div>
            </div>


        </>
    );
}
export default reportissue;