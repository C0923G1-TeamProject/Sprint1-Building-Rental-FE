import { axiosCof } from "../../components/Config/axios-config";
export const getInfoUser = async () => {
  debugger;
  const res = await axiosCof.get(
    "http://localhost:8080/information/getInformationUser"
  );
  console.log(res.data);
  return res.data;
};

export const updateInfo = async (user) => {
  debugger
  const obj = { ...user, gender: user.gender === "1" ? true : false };
  const res = await axiosCof.post(
    "http://localhost:8080/information/updateInformation",
    obj
  );
  return res.data;
};
export const updateInfoUser = async (imageDto) => {
  const res = await axiosCof.post(
    "http://localhost:8080/information/updateImage",
    imageDto
  );
  return res.data;
};

export const changePassword = async (user) => {
    const res = await axiosCof
    .post("http://localhost:8080/information/changed-password", user)
  return res.data;
};
