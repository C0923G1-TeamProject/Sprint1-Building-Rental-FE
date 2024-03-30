import { axiosCof } from "../../components/Config/axios-config";
export const getInfoUser = async () => {
  const res = await axiosCof.get(
    "http://localhost:8080/information/getInformationUser"
  );
  return res.data;
};

export const updateInfo = async (user) => {
  console.log(user);
  if (user.gender == "Nam") {
    user.gender = 1;
  } else {
    user.gender = 0;
  }
  const res = await axiosCof.post(
    "http://localhost:8080/information/updateInformation",
    user
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
  const res = await axiosCof.post(
    "http://localhost:8080/information/changed-password",
    user
  );
  return res.data;
};
