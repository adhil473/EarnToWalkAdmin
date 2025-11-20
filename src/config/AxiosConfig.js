import axios from 'axios'

// export const basicURL = "http://192.168.29.112:5020/api/" ;

export const basicURL = "https://backend.axtotoken.com/api/" ;


export const  axiosConfig = axios.create({
    baseURL:basicURL,
    withCredentials:true
})

axiosConfig.interceptors.request.use(
function (config) {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  } else {
    console.log("error");
  }
    
  return config;
});

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && 
        error.response?.data?.success === false && 
        error.response?.data?.message === "Invalid token.") {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);