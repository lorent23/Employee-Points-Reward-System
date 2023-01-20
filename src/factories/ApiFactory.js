import Axios from "axios";
import i18n from "../locales/i18n";
import { store } from "../store/store.js";
import { logout } from "../store/slices/authSlice.js";

const { dispatch } = store; // direct access to redux store.

const whiteList = ["/v1/auth/login"]; // list of routes that don't need to redirect on 401.

const apiFactory = Axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "X-FROM-PLATFORM": "SUPPORT",
        "Accept-Language": i18n.locale,
    },
});

apiFactory.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (!config.headers["Accept-Language"]) {
            config.headers["Accept-Language"] = i18n.locale || "en";
        }
        return config;
    },
    (error) => {
        if (error.response.status === 401) {
            if (!whiteList.includes(error.config.url)){
                dispatch(logout());
            }
        }
        return Promise.reject(error.response.data);
    }
);

apiFactory.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (!whiteList.includes(error.config.url)){
                dispatch(logout());
            }
        }
        return Promise.reject(error.response ? error.response.data : error);
    }
);

export default apiFactory;
