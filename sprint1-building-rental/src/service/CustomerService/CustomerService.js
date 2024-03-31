import axios from "axios";

export const getAll = async (name, email, page) => {
    try {
        const res = await axios.get(`http://localhost:8080/customer/show?name=${name}&email=${email}&page=${page}`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const createCustomer = async (customer) => {
    try {
        const res = await axios.post("http://localhost:8080/customer/add", customer)
    } catch (e) {
        console.log(e);
    }
}