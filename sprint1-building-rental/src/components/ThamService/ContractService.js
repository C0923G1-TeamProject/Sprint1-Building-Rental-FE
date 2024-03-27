import axios from "axios";

export const getAll = async (search) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/contract/search?nameCustomer=${search.nameCustomer}&statusContract=${search.statusContract}`
    );
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
