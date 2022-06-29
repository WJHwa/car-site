import axios from "axios";

const baseURL = "http://localhost:8080";

let token = sessionStorage.getItem("key");
const axiosInstance = axios.create({
  baseURL,
  headers: {
    authorization: `bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (token) {
    let token = sessionStorage.getItem("key");
    req.headers.authorization = `bearer ${token}`;
  }
  return req;
});

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const { config } = err;

//     const originalRequest = config;

//     if (
//       err.message === "Request failed with status code 403" ||
//       err.response.status === 403
//     ) {
//       let response = await axiosInstance.post("/refresh");

//       localStorage.setItem("Tok", response.data.accessToken);
//       originalRequest.headers.authorization = `bearer ${response.data.accessToken}`;
//       return axiosInstance(originalRequest);
//     }
//     return Promise.reject(err);
//   }
// );

// export default axiosInstance;
