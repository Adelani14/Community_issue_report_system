import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

function editprofile() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        const fetchProfile = async () => {

            const token = localStorage.getItem("accessToken");

            const res = await axios.get(
                "https://community-issue-report-system-1.onrender.com/myprofile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            setFirstname(res.data.firstname);
            setLastname(res.data.lastname);
            setEmail(res.data.email);

        };

        fetchProfile();

    }, []);

    const handleUpdate = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("accessToken");

        await axios.put(
            "https://community-issue-report-system-1.onrender.com/updateprofile",
            {
                firstname,
                lastname,
                email
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            }
        );

        alert("Profile updated successfully");

    };



    const uploadProfileimage = async () => {
        setLoading(true)

        const formData = new FormData()

        formData.append("profileImage", image)

        const token = localStorage.getItem("accessToken")

        await axios.post(
            // "http://localhost:5000/uploadProfile",
            "https://community-issue-report-system-1.onrender.com/uploadProfile",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        alert("Profile updated")
        window.location.reload()
        setLoading(false)

    }

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

            <div className="container  ">
                <div className="d-flex justify-content-between  p-2">
                    <div className="  fs-3 fw-medium">Edit Profile details</div>
                    <button className="btn btn-outline-success" onClick={() => window.location.href = '/userdashboard'}>
                        Dashboard
                    </button>
                </div>
                <form onSubmit={handleUpdate}>

                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="form-control mb-3"
                        placeholder="First name"
                    />

                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="form-control mb-3"
                        placeholder="Last name"
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control mb-3"
                        placeholder="Email"
                    />



                    <button className="btn btn-success">
                        Update details
                    </button>

                </form>

                <div>
                    <label htmlFor="updateprofileimage" className="mt-4 fs-3 fw-medium"> Upload Profile image  </label><br></br>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />

                    <button className="btn btn-outline-success" onClick={uploadProfileimage}>
                        Upload
                    </button>
                </div>

            </div>
        </>
    );

}

export default editprofile;