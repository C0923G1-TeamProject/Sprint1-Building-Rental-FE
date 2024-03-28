import axios from "axios";

export const getAll = async () => {
    try {
        const res = await axios.get("http://localhost:8080/customer/show");
        return res.data;
    } catch (e) {
        console.log(e)
    }
}
export const searchCustomer = async (name, card) => {
    try {
        const res = await axios.get(`http://localhost:8080/customer/show?name=${name}&card=${card}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
export const createCustomer = async (customer) => {
    try {
        const res = await axios.post("http://localhost:8080/customer/add", customer)
    } catch (e) {
        console.log(e);
    }
}