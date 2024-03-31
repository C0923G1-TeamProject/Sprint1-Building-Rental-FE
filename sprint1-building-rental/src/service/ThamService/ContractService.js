import axios from "axios";
export const getAll = async (pageContract) => {
  try {
    const res = await axios.post(
      `http://localhost:8080/contract`,pageContract
    );
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllPage = async (pageContract) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/contract",
      pageContract
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};


export const getAllPremises = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/premises/createContract");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getAllCustomer = async () => {
  try {
    const res = await axios.get("http://localhost:8080/customer/show");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const addContract = async (contract) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/contract/create",
      contract
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
