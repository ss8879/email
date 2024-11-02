import axios from "axios";

export const axiosinstance = axios.create({});

export const apiconnector = (method, url, bodyData, headers, params) => {
  return axiosinstance({
    method,
    url,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};