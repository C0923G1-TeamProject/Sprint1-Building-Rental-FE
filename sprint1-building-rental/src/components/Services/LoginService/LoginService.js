import axios from "axios";

export const submit = async (account) => {
    try {
        const res = await axios.post("http://localhost:8080/api/auth/test", account);
        console.log(res.data);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export const getInfoOtp = async (acc) => {
    try {
        const res = await axios.post("http://localhost:8080/api/auth/send-otp", acc);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export const login = async (account) => {
    try {
        const res = await axios.post("http://localhost:8080/api/auth/login", account);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}