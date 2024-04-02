import axios from 'axios';
export const detailPremisesService = async (id) => {
    try {
      let rs = await axios.get(`http://localhost:8080/api/premises/get/${id}`);
      return rs.data;
    } catch (e) {
      return undefined;
    }
  };