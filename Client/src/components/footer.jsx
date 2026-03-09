import React from "react";
// import './App.css';
const footer = () => {
    return (
        <>
            <footer className="bg-white pt-5 pb-3">
                <div className="container">
                    <div className="row g-4 border-bottom pb-5">
                        <div className="col-md-4">
                            <h5 className="fw-bold text-success mb-3">
                                <i className="bi bi-activity"></i> FixMyArea</h5>
                            <p className="small text-muted ">Making our communities cleaner, safer, and better for everyone.</p>
                        </div>
                        <div className="col-6 col-md-2">
                            <h6 className="fw-bold mb-3 small">Quick Links</h6>
                            <ul className="list-unstyled small">
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">About Us</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">How It Works</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Terms of Service</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-3">
                            <h6 className="fw-bold mb-3 small">Contact</h6>
                            <ul className="list-unstyled small">
                                <li className="mb-2 text-muted"><i className="bi bi-envelope me-2"></i> support@fixmyarea.com</li>
                                <li className="mb-2 text-muted"><i className="bi bi-geo-alt me-2"></i> 123 Community Drive</li>
                                <li className="mb-2 text-muted">City Hall, Suite 400</li>
                            </ul>
                        </div>
                        <div className="col-md-3 text-md-end">
                            <h6 className="fw-bold mb-3 small">Follow Us</h6>
                            <div className="d-flex gap-3 justify-content-md-end">
                                <a href="#" className="text-dark"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="text-dark"><i className="bi bi-twitter-x"></i></a>
                                <a href="#" className="text-dark"><i className="bi bi-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-muted small mt-4">© 2026 FixMyArea. Designed for a better community.</p>
                </div>
            </footer>
        </>
    );
};
export default footer;