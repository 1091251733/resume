import request from "./request";
export const Login = (data) => {
  //登录
  return request("POST", "/user/login", data);
};
