import axios from "axios";
   export const axiosCof = axios.create()

    axiosCof.interceptors.request.use(
        function (config) {
            let token = "112";
            if (localStorage.getItem("rm")){
                token = localStorage.getItem("token");
            } else {
                token = sessionStorage.getItem("token");
            }
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );

