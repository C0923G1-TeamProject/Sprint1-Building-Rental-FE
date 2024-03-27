import axios from 'axios';
export const getAllPremises = async (floor, code, area, premisesName, page) => {
    try {
        let rs = await axios.get(`http://localhost:8080/api/premises/search?floor=${floor}&code=${code}&area=${area}&premisesName=${premisesName}&page=${page}` );
        console.log(rs.data);
        return rs.data

    } catch (e) {
        console.log(e);
    }
}