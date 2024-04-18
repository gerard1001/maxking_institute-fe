import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const interceptRequest = (request: InternalAxiosRequestConfig) => {
  return request;
};

const interceptSuccessResponse = (response: AxiosResponse) => {
  return response;
};

const interceptorErrorResponse = (error: any) => {
  if (error instanceof Error) {
    const axiosError = error as AxiosError;
  }

  return Promise.reject(error);
};

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const loginToken = JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("loginData")) ||
        "{}"
    );
    request.headers.authorization = `${"Bearer" + " "}${
      loginToken?.login_token
    }`;
    return request;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.request.use(interceptRequest);
axiosInstance.interceptors.response.use(
  interceptSuccessResponse,
  interceptorErrorResponse
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error?.response?.status === 401) {
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
