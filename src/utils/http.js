import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API;

export const httpClient = axios.create({
    baseURL,
})

httpClient.interceptors.request.use((config) => {
    // const accessToken = localStorage.getItem("accessToken");
    // if(accessToken) {
    //     config.headers.set("Authorization", `Bearer ${accessToken}`);
    // }

    return config
})

// let isRefreshing = false;

// let failQueue = [];

// const processQueue = (error) => {
//     failQueue.forEach((prom) => {
//         if(error){
//             prom.reject(error)
//         } else {
//             prom.resolve();
//         }
//     })

//     failQueue = [];
// };

// const refreshToken = async() => {
//     try {
//         const result = await axios.post(`${baseURL}/auth/refresh-token`, {
//             refresh_token: localStorage.getItem("refreshToken"),
//         })

//         localStorage.setItem("accessToken", result.data.data.access_token);
//         localStorage.setItem("refreshToken", result.data.data.refresh_token);

//         processQueue(null)
//     } catch (error) {
//         processQueue(error);
//         throw error;
//     }
// }

// const getNewToken = async () => {
//     if(!isRefreshing) {
//         isRefreshing = true;
//         await refreshToken();
//         isRefreshing = false;
//         return;
//     }

//     return new Promise((resolve, reject) => {
//         failQueue.push({resolve, reject});
//     });
// };

httpClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // const shouldRenewToken = error.response.status === 401 && !originalRequest._retry;

        // if (shouldRenewToken) {
        //     originalRequest._retry = true;

        //     try {
        //         await getNewToken();
                return httpClient(originalRequest);
        //     } catch (error) {
        //         return Promise.reject(error);
        //     }
        // };
    }
);

const _send = async (method, path, data, config) => {
    const response = await httpClient.request({
        ...config,
        method,
        url: path,
        data
    });

    return response.data;
}

const get = async (path, config) => {
    return await _send("GET", path, null, config);
}

const post = async (path, data, config) => {
    return await _send("POST", path, data, config);
}
const put = async (path, data, config) => {
    return await _send("PUT", path, data, config);
}
const patch = async (path, data, config) => {
    return await _send("PATCH", path, data, config);
}
const del = async (path, config) => {
    return await _send("DELETE", path, null, config);
}

const http = { get, post, put, patch, del };

export default http;