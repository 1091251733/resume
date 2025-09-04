import request from "./request";
interface UserInfotype {
  page: number | string;
  pageSize: number | string;
  account?: string;
}

export const Login = (data: any) => {
  //登录
  return request("POST", "/user/login", data);
};
export const register = (data: any) => {
  //注册
  return request("POST", "/v1/register", data);
};
export const getTransactionDetails = (data: any) => {
  //表格
  return request("GET", "/queryOrderList", data);
};
export const fileupload = (data: any) => {
  //文件上传 file（二进制）
  return request("POST", "/online/addOrder", data, "form", "json");
};

export const moneyList = (data: UserInfotype) => {
  //金额列表
  return request(
    "GET",
    `/user/account/order_list?page=${data.page}&page_size=${
      data.pageSize
    }&account=${data.account ? data.account : ""}`
  );
};
