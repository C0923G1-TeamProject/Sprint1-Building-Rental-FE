import axios from "axios";
import { axiosCof } from "../../Config/axios-config";
export const getInfoUser = async () => {
  const res = await axiosCof.get(
    "http://localhost:8080/information/getInformationUser"
  );
  console.log(res);
  return res.data;
};
