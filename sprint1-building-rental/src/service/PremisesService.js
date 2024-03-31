import axios from 'axios';
import {axiosCof} from "../components/Config/axios-config";

export const getAllPremises = async (floor, code, area, premisesName, page) => {
    try {
        let rs = await axiosCof.get(`http://localhost:8080/api/premises/search?floor=${floor}&code=${code}&area=${area}&premisesName=${premisesName}&page=${page}`);
      
        return rs.data;
    

    } catch (e) {
        console.log(e);
    }
    
}

export const getAllPremisesHomePage = async (floor, code, area, premisesName, page) => {
    try {
        let rs = await axiosCof.get('http://localhost:8080/api/premises/search', {params: {floor, code, area, premisesName, page}} );
        return rs.data
    

    } catch (e) {
        console.log(e);
    }
    
}



export const updatePremises = async (id ,premises) =>{
    debugger;
    console.log(premises);
    try {
        let rs = await axiosCof.patch(`http://localhost:8080/api/premises/update/${id}`, premises);
        console.log(rs)
    }catch (e) {
        console.log(e);
    }
}

export const findPremises = async (id) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/premises/find/${id}`);
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
        return rs.data;

    }catch (e) {
        console.log(e);
    }
}

export const getListStatus = async () => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/premises/getListStatus`);
        return rs.data;
    }catch (e) {
        console.log(e);
    }
}