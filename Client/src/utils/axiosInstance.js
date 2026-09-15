import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://community-issue-report-system-1.onrender.com",
    withCredentials: true,
});

// Attach access token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Refresh expired token
axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        console.log("401 detected:", error.response?.status);

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== "/refresh-token"
        ) {
            console.log("Trying to refresh token...");

            originalRequest._retry = true;

            try {
                const res = await axiosInstance.post("/refresh-token");

                console.log("Refresh successful", res.data);

                localStorage.setItem(
                    "accessToken",
                    res.data.accessToken
                );

                return axiosInstance(originalRequest);

            } catch (err) {
                console.log("Refresh failed", err.response?.data);

                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;