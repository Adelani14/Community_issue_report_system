import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import publicAxios from "../utils/publicAxios.js";
import { Link } from "react-router-dom";



const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {

            if (password !== confirmPassword) {
                setError("Passwords do not match");
                setLoading(false);
                setTimeout(() => {
                    setError("");
                }, 2000);
                return;
            }

            const response = await publicAxios.post(
                `/reset-password/${token}`,
                {
                    password,
                    confirmPassword
                }
            );

            setMessage(response.data.message);
            setTimeout(() => {
                setMessage("");
            }, 2000);

            setPassword("");
            setConfirmPassword("");

            // Give user a moment to see success message
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            < div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center" >

                <div className="card shadow-lg p-4 mt-3" style={{ maxWidth: "480px", width: "100%", borderRadius: "20px" }}>
                    <div className="text-center mb-4">
                        
                        <h1 className="h4">Reset Password</h1>
                        <p className="text-muted mb-0">Enter your new password below.</p>
                    </div>

                    <form onSubmit={handleSubmit}>


                        <label htmlFor="password" className=" form-label fw-bold small">
                            New Password
                        </label>
                        <div className="mb-3 input-group">
                            <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                minLength={6}
                                required
                                className="form-control bg-light border-start-0 active"
                            />
                        </div>

                        <label htmlFor="confirmPassword" className=" form-label fw-bold small">
                            Confirm Password
                        </label>
                        <div className="mb-1 input-group">
                            <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                minLength={6}
                                required
                                className="form-control bg-light border-start-0 active"
                            />



                        </div>

                        {message && (
                            <small className=" text-success ">
                                {message}
                            </small>
                        )}
                        {error && (
                            <small className=" text-danger ">
                                {error}
                            </small>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-outline-primary w-100 mt-2 py-2 fw-bold"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>

                    </form>


                    {/* Back to Login */}
                    <div className="text-center mt-3">
                        <Link
                            to="/login"
                            className="small font-medium text-secondary text-decoration-none "
                        >
                            ← Back to login
                        </Link>
                    </div>
                </div>



               
            </div >
        </>
    );
}
export default ResetPassword;



