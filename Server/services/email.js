const axios = require("axios");




// ========================================
// SIGN UP / WELCOME EMAIL
// ========================================

const signUpEmail = async (user) => {

    const html = `

<div style="
    max-width:600px;
    margin:30px auto;
    background:white;
    padding:30px;
    border-radius:10px;
    font-family:Arial, Helvetica, sans-serif;
">

    <h2 style="
        color:#2563eb;
        text-align:center;
        margin-bottom:25px;
    ">
        Welcome to Community Issue Reporting 🎉
    </h2>

    <p style="
        font-size:16px;
        color:#444;
    ">
        Hello <strong>${user.firstname}</strong>,
    </p>

    <p style="
        font-size:16px;
        color:#444;
        line-height:1.6;
    ">
        Welcome to the
        <strong>Community Issue Reporting System</strong>.
        Your account has been successfully created.
    </p>

    <p style="
        font-size:16px;
        color:#444;
        line-height:1.6;
    ">
        You can now report issues in your community, track the
        progress of your reports, and stay informed about their
        status.
    </p>

    <div style="
        background:#eff6ff;
        border:1px solid #bfdbfe;
        padding:18px;
        border-radius:8px;
        margin:25px 0;
    ">

        <p style="
            margin:0 0 10px 0;
            color:#1e40af;
            font-size:14px;
            font-weight:bold;
        ">
            Your account is ready!
        </p>

        <p style="
            margin:0;
            color:#475569;
            font-size:14px;
            line-height:1.6;
        ">
            Start making your community better by reporting
            issues that need attention.
        </p>

    </div>

    <div style="
        text-align:center;
        margin:30px 0;
    ">

        <a
            href="${process.env.FRONTEND_URL}"
            style="
                background:#2563eb;
                color:white;
                padding:14px 25px;
                text-decoration:none;
                border-radius:6px;
                display:inline-block;
                font-weight:bold;
                font-size:15px;
            "
        >
            Visit Community Reporting
        </a>

    </div>

    <p style="
        font-size:14px;
        color:#666;
        line-height:1.6;
    ">
        Thank you for joining us and helping improve your community.
    </p>

    <hr style="
        border:none;
        border-top:1px solid #eee;
        margin:30px 0;
    ">

    <p style="
        font-size:13px;
        color:#888;
        text-align:center;
        line-height:1.5;
    ">
        © ${new Date().getFullYear()}
        Community Issue Reporting System.
        All rights reserved.
    </p>

</div>

`;

    try {

        const response = await axios.post(

            "https://api.brevo.com/v3/smtp/email",

            {

                sender: {
                    name: "Community Issue Reporting",
                    email: process.env.EMAIL_USER
                },

                to: [
                    {
                        email: user.email,
                        name: user.firstname
                    }
                ],

                subject: "Welcome to Community Issue Reporting 🎉",

                htmlContent: html
            },

            {

                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json"
                }

            }

        );

        console.log("✅ Signup email sent");

        return response.data;

    } catch (error) {

        console.log("❌ Brevo API Error");

        console.log(
            error.response?.data || error.message
        );

        throw error;
    }
};





// ========================================
// FORGOT PASSWORD EMAIL
// ========================================

const forgotPasswordEmail = async (user, resetUrl) => {

    const html = `

<div style="
    max-width:600px;
    margin:30px auto;
    background:white;
    padding:30px;
    border-radius:10px;
    font-family:Arial, Helvetica, sans-serif;
">

    <h2 style="
        color:#222;
        text-align:center;
        margin-bottom:25px;
    ">
        Reset Your Password 🔐
    </h2>

    <p style="font-size:16px; color:#444;">
        Hello <strong>${user.firstname}</strong>,
    </p>

    <p style="font-size:16px; color:#444; line-height:1.6;">
        We received a request to reset the password for your
        <strong>Community Issue Reporting System</strong> account.
    </p>

    <p style="font-size:16px; color:#444; line-height:1.6;">
        If you made this request, click the button below to create
        a new password for your account.
    </p>

    <div style="text-align:center; margin:30px 0;">

        <a
            href="${resetUrl}"
            style="
                background:#2563eb;
                color:white;
                padding:14px 25px;
                text-decoration:none;
                border-radius:6px;
                display:inline-block;
                font-weight:bold;
                font-size:15px;
            "
        >
            Reset Password
        </a>

    </div>

    <p style="
        font-size:14px;
        color:#666;
        line-height:1.6;
    ">
        This password reset link will expire in
        <strong>15 minutes</strong> for security reasons.
    </p>

    <p style="
        font-size:14px;
        color:#666;
        line-height:1.6;
    ">
        If you did not request a password reset, you can safely ignore
        this email. Your password will remain unchanged.
    </p>

    <hr style="
        border:none;
        border-top:1px solid #eee;
        margin:30px 0;
    ">

    <p style="
        font-size:13px;
        color:#888;
        text-align:center;
        line-height:1.5;
    ">
        © ${new Date().getFullYear()} Community Issue Reporting System.
        All rights reserved.
    </p>

</div>

`;

    try {

        const response = await axios.post(

            "https://api.brevo.com/v3/smtp/email",

            {
                sender: {
                    name: "Community Issue Reporting",
                    email: process.env.EMAIL_USER
                },

                to: [
                    {
                        email: user.email,
                        name: user.firstname
                    }
                ],

                subject: "Reset Your Password 🔐",

                htmlContent: html
            },

            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json"
                }
            }

        );

        console.log("✅ Password reset email sent");

        return response.data;

    } catch (error) {

        console.log("❌ Brevo API Error");

        console.log(
            error.response?.data || error.message
        );

        throw error;
    }
};


// ========================================
// PASSWORD RESET SUCCESS EMAIL
// ========================================

const resetPasswordEmail = async (user) => {

    const html = `

<div style="
    max-width:600px;
    margin:30px auto;
    background:white;
    padding:30px;
    border-radius:10px;
    font-family:Arial, Helvetica, sans-serif;
">

    <h2 style="
        color:#16a34a;
        text-align:center;
        margin-bottom:25px;
    ">
        Password Reset Successful ✅
    </h2>

    <p style="font-size:16px; color:#444;">
        Hello <strong>${user.firstname}</strong>,
    </p>

    <p style="
        font-size:16px;
        color:#444;
        line-height:1.6;
    ">
        Your password for your
        <strong>Community Issue Reporting System</strong>
        account has been successfully changed.
    </p>

    <div style="
        background:#f0fdf4;
        border:1px solid #bbf7d0;
        padding:15px;
        border-radius:6px;
        margin:25px 0;
    ">

        <p style="
            margin:0;
            color:#166534;
            font-size:14px;
        ">
            ✓ Your password has been updated successfully.
        </p>

    </div>

    <p style="
        font-size:14px;
        color:#666;
        line-height:1.6;
    ">
        If you made this change, no further action is required.
    </p>

    <p style="
        font-size:14px;
        color:#666;
        line-height:1.6;
    ">
        If you did not make this change, please contact support
        immediately and secure your account.
    </p>

    <hr style="
        border:none;
        border-top:1px solid #eee;
        margin:30px 0;
    ">

    <p style="
        font-size:13px;
        color:#888;
        text-align:center;
        line-height:1.5;
    ">
        © ${new Date().getFullYear()} Community Issue Reporting System.
        All rights reserved.
    </p>

</div>

`;

    try {

        const response = await axios.post(

            "https://api.brevo.com/v3/smtp/email",

            {
                sender: {
                    name: "Community Issue Reporting",
                    email: process.env.EMAIL_USER
                },

                to: [
                    {
                        email: user.email,
                        name: user.firstname
                    }
                ],

                subject: "Password Reset Successful ✅",

                htmlContent: html
            },

            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json"
                }
            }

        );

        console.log("✅ Password reset confirmation email sent");

        return response.data;

    } catch (error) {

        console.log("❌ Brevo API Error");

        console.log(
            error.response?.data || error.message
        );

        throw error;
    }
};


module.exports = {
    forgotPasswordEmail,
    resetPasswordEmail,
    signUpEmail
};