import axios from "axios";
import {axiosCof} from "../../components/Config/axios-config";


export const loginOtp = async (acc) => {
    try {
        const res = await axiosCof.post("http://localhost:8080/api/auth/login-otp", acc);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export const login = async (account) => {
    try {
        const res = await axiosCof.post("http://localhost:8080/api/auth/login", account);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export const resend = async (account) => {
    try {
        const res = await axiosCof.post("http://localhost:8080/api/auth/resend-otp", account);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export const checkAuth = async () => {
    try {
        const res = await axiosCof.get("http://localhost:8080/api/auth/getInfo");
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export const logout = async () => {
    try {

        const res = await axiosCof.post("http://localhost:8080/api/auth/logout");
        console.log(res.data);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}