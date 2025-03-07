import request from "./request";
export const Login = (data) => {
  //登录
  return request("POST", "/user/login", data);
};
export const register = (data) => {
  //注册
  return request("POST", "/v1/register", data);
};

export const getTransactionDetails = (data) => {
  //表格
  return request("POST", "/aliyun/cloud/page", data);
};

export const moneyList = (data) => {
  //金额列表
  return request(
    "GET",
    `/user/account/order_list?page=${data.page}&page_size=${
      data.pageSize
    }&account=${data.account ? data.account : ""}`
  );
};
