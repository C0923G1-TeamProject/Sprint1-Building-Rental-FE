import axios from "axios";
import { axiosCof } from "../../components/Config/axios-config";
export const getAll = async (pageContract) => {
  try {
    const res = await axiosCof.post(
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
    const res = await axiosCof.post(
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
    const res = await axiosCof.get("http://localhost:8080/api/premises/createContract");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getAllCustomer = async () => {
  try {
    const res = await axiosCof.get("http://localhost:8080/customer/getCustomers");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const addContract = async (contract) => {
  try {
    const res = await axiosCof.post(
      "http://localhost:8080/contract/create",
      contract
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }

  
};
export const getInfo = async () => {
  try {
    const res = await axiosCof.post(
      "http://localhost:8080/contract/getInfo"
      
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getAllContractByUser = async (pageContractByEmployee) => {
  try {
    const res = await axiosCof.post(
      "http://localhost:8080/contract/accountEmployee",
      pageContractByEmployee
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};


