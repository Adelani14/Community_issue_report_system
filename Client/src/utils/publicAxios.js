import axios from "axios";

export default axios.create({
    baseURL: "https://community-issue-report-system-1.onrender.com",
    withCredentials: true,
});