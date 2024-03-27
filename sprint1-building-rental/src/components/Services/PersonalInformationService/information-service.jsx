import axios from "axios"

export const getInfoUser = async () => {
    const res = await axios.get("http://localhost:8080/information/getInformationUser")
    return res.data;
}