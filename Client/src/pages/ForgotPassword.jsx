import { useState } from "react";
import { Link } from "react-router-dom";
import publicAxios from "../utils/publicAxios.js";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await publicAxios.post(
                `/forgot-password`,
                {
                    email
                }
            );
            setMessage(response.data.message);
            setEmail("");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
            setTimeout(() => {
                setError("");
            }, 2000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            < div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center" >

                <div className="card shadow-lg p-4 mt-3" style={{ maxWidth: "480px", width: "100%", borderRadius: "20px" }}>
                    <div className="text-center mb-4">
                        <p className="text-muted mb-0">Enter your email address to reset your password.</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-2">
                            <label htmlFor="email" className=" form-label fw-bold small">
                                Email Address
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="form-control bg-light border-start-0 active"
                                />
                            </div>
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
                            className="btn btn-primary-fma w-100 py-3 mb-3 fw-bold"
                        >
                            {loading ? "Processing..." : "Continue"}
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



                <p className="text-center mt-4 text-xs text-gray-400 mt-6">
                    © 2026 Mutpel Household. All rights reserved.
                </p>
            </div >


        </>
    );
}
export default ForgotPassword;
