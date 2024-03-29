import axios from 'axios';
import async from "async";

export const getAllPremises = async (floor, code, area, premisesName, page) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/premises/search?floor=${floor}&code=${code}&area=${area}&premisesName=${premisesName}&page=${page}` );
        console.log(rs.data);
        return rs.data

    } catch (e) {
        console.log(e);
    }
}

export const updatePremises = async (premises) =>{
    try {
        let rs = await axios.patch(`http://localhost:8080/api/premises/update/${premises.id}`);
        console.log(rs.data);
        return rs.data;
    }catch (e) {
        console.log(e);
    }
}

export const findPremises = async (id) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/premises/find/${id}`);
        console.log(rs.data);
        return rs.data;
    }catch (e) {
        console.log(e);
    }
}

export const getListFloor = async () => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/premises/getListFloor`);
        return rs.data;
    }catch (e) {
        console.log("api lỗi");
    }
}

export const getListType = async () => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/premises/getListType`);


    }catch (e) {
        console.log(e);
    }
}

export const getListStatus = async () => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/premises/getListStatus`);
        console.log(rs.data);
    }catch (e) {
        console.log(e);
    }
}