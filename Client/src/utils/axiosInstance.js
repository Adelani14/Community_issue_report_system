import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

// Automatically refresh expired access tokens
axiosInstance.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const res = await axios.post(
                    "http://localhost:5000/refresh_token",
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;

                localStorage.setItem("accessToken", newAccessToken);

                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);

            } catch (err) {

                localStorage.removeItem("accessToken");
                window.location.href = "/login";

            }

        }

        return Promise.reject(error);
    }
);

export default axiosInstance;