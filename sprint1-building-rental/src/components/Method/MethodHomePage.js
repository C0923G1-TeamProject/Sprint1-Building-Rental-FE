import axios from "axios";
export const getAllPremisesHomePage = async () => {
  try {
    let rs = await axios.get("http://localhost:8080/api/premises/search");
    return rs.data;
  } catch (e) {
    return undefined;
  }
};
// export const getAllPremisesHomePage = async () => {
//     try {
//       let rs = await axios.get("http://localhost:8080/api/premises/searchByType?id=1");
//       return rs.data;
//     } catch (e) {
//       return undefined;
//     }
//   };
