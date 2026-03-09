import React from "react";
import img1 from '../assets/images/community.jpg'
import img2 from '../assets/images/workingwithlaptop.jpg'
import Footer from "../components/footer";
import Navbar from "../components/navbar";
// import './App.css';
const landingpage = () => {
    return (
        <>

            <Navbar />

            <section className="pt-4 overflow-hidden">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <span className="badge bg-success-subtle text-success mb-3 px-3 py-2 rounded-pill">● Trusted by 50+ Municipalities</span>
                            <h1 className="display-4 fw-bold mb-4">Report Community <span className="text-success">Issues Effortlessly.</span></h1>
                            <p className="lead text-muted mb-5 pe-lg-5">Join thousands of citizens making their areas better. Report bad roads, waste, or maintenance needs in seconds and track resolutions in real-time.</p>
                            <div className="d-flex gap-3">
                                <button className="btn btn-primary-fma px-4 py-3">Get Started Now &nbsp; <i className="bi bi-arrow-right"></i></button>
                                <button className="btn btn-outline-fma px-4 py-3">Sign In</button>
                            </div>
                        </div>
                        <div className="col-lg-6 position-relative">
                            <div className="rounded-4 overflow-hidden shadow-lg border">
                                <img src={img1} style={{ height: '450px', width: '100%' }} className="img-fluid" alt="User reporting issue" />
                            </div>
                            <div className="card position-absolute bottom-0 start-0 m-4 p-3 shadow border-0 d-flex flex-row align-items-center" style={{ width: '320px' }}>
                                <div className="bg-light p-2 rounded-circle me-3"><i className="bi bi-check-circle text-success"></i></div>
                                <div>
                                    <small className="text-muted d-block fw-bold" style={{ fontSize: '10px' }}>RECENT SUCCESS</small>
                                    <span className="small fw-bold">Road pothole fixed in Oak St.</span>
                                </div>
                                <div className="ms-auto text-end">
                                    <span className="text-success fw-bold d-block">2.4h</span>
                                    <small className="text-muted" style={{ fontSize: '10px' }}>Avg. Response</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-light">
                <div className="container text-center">
                    <h2 className="fw-bold mb-3">Improve Your Area in 3 Steps</h2>
                    <p className="text-muted mx-auto mb-5" style={{ maxWidth: '600px' }}>We've simplified the reporting process so you can focus on making a difference, not filling out paperwork.</p>
                    <div className="row g-4 mt-4">
                        <div className="col-md-4">
                            <div className="card p-5 feature-card h-100 position-relative">
                                <div className="step-number">01</div>
                                <div className="icon-box bg-success-subtle mx-auto">
                                    <i className="bi bi-camera text-success fs-3"></i>
                                </div>
                                <h5 className="fw-bold">Take Photo & Report</h5>
                                <p className="small text-muted">Notice an issue? Snap a quick photo using your phone and provide a brief title of the problem.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-5 feature-card h-100 border border-success position-relative">
                                <div className="step-number">02</div>
                                <div className="icon-box bg-success-subtle mx-auto">
                                    <i className="bi bi-pin-map text-success fs-3"></i>
                                </div>
                                <h5 className="fw-bold">Add Location</h5>
                                <p className="small text-muted">Our system automatically detects your location or you can manually pin it on our precise maps.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-5 feature-card h-100 position-relative">
                                <div className="step-number">03</div>
                                <div className="icon-box bg-success-subtle mx-auto">
                                    <i className="bi bi-bar-chart-line text-success fs-3"></i>
                                </div>
                                <h5 className="fw-bold">Track Resolution</h5>
                                <p className="small text-muted">Receive instant notifications as your report moves from pending to in-progress and finally resolved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="row mb-5 align-items-end">
                        <div className="col-md-6">
                            <span className="text-success fw-bold small text-uppercase mb-2 d-block">Powerful Features</span>
                            <h2 className="fw-bold display-6">Built for Citizens & Cities</h2>
                        </div>
                        <div className="col-md-5 offset-md-1">
                            <p className="text-muted">Our platform provides professional-grade tools to ensure every report is heard and every issue is addressed.</p>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card p-4 border feature-card">
                                <i className="bi bi-lightning-charge text-warning fs-3"></i>
                                <h6 className="fw-bold">Easy Issue Reporting</h6>
                                <p className="small text-muted mb-0">A streamlined interface designed for speed. Report problems in less than 60 seconds.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-4 border feature-card">
                                <i className="bi bi-cloud-arrow-up text-primary fs-3"></i>
                                <h6 className="fw-bold">High-Res Image Upload</h6>
                                <p className="small text-muted mb-0">Support for multiple photos and attachments to provide full context to maintenance teams.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-4 border feature-card">
                                <i className="bi bi-bar-chart-line text-info fs-3"></i>
                                <h6 className="fw-bold">Live Status Tracking</h6>
                                <p className="small text-muted mb-0">Real-time dashboard showing exactly where your report stands in the resolution queue.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-4 border feature-card">
                                <i className="bi bi-columns-gap text-info fs-3"></i>
                                <h6 className="fw-bold">Admin Command Center</h6>
                                <p className="small text-muted mb-0">Dedicated tools for city officials to assign tasks and manage resources efficiently.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-4 border feature-card">

                                <i className="bi bi-shield-check text-success fs-3"></i>
                                <h6 className="fw-bold">Secure Identity</h6>
                                <p className="small text-muted mb-0">Encrypted logins and verified reports to prevent spam and ensure data integrity.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-4 border feature-card">
                                <i className="bi bi-pin-map text-primary fs-3"></i>
                                <h6 className="fw-bold">Geo-spatial Intelligence</h6>
                                <p className="small text-muted mb-0">Smart mapping that clusters reports to help teams identify recurring problem zones.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mb-5">
                <div className="card bg-success text-white p-5 overflow-hidden position-relative">
                    <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
                        <div className="col-lg-7">
                            <h2 className="display-5 fw-bold mb-3">Ready to improve your community?</h2>
                            <p className="mb-4 fs-5 opacity-75">Join FixMyArea today and start reporting. Together, we can build a cleaner, safer, and more beautiful neighborhood.</p>
                            <div className="d-flex gap-3">
                                <button className="btn btn-light text-success fw-bold px-4 py-3 rounded-pill">Get Started Free</button>
                                <button className="btn btn-outline-light px-4 py-3 rounded-pill fw-bold">Partner with Us</button>
                            </div>
                        </div>
                        <div className="col-lg-5 d-none d-lg-block">
                            <img src={img2} className="img-fluid rounded-3 shadow" style={{ transform: 'rotate(2deg)' }} />
                        </div>
                    </div>
                </div>
            </section>


            <Footer />


        </>
    );
}

export default landingpage;