export const base = import.meta.env.PROD
  ? "https://api.dcje830.com/task/tapi/s1" //生产环境
  : "https://api.dcje830.com/task/tapi/s1"; //开发环境  fasdffqw  fasdfgsdgadfqwr

/**
 * 请求函数
 *
 * @export
 * @template R
 * @param {("GET" | "POST" | "PUT" | "PATCH" | "DELETE")} method
 * @param {string} url
 * @param {*} [data]
 * @param {("json" | "form")} [dataType="json"] 请求体的数据类型 POST PUT PATCH
 * @param {("json" | "text" | "blob")} [returnType="json"] 返回值的数据类型
 * @return {*}
 */
import { useBeginStore } from "@/store/contextmodel";
import { ElMessage } from "element-plus";
console.log(useBeginStore().token);

export default function request(method, url, data, dataType, returnType) {
  let config = {
    method,
    headers: {
      // Authorization: "bearer " + useBeginStore().token,
      token: useBeginStore().token,
    },
  };
  if (!["GET", "DELETE"].includes(method)) {
    if (dataType === "json") {
      config.body = JSON.stringify(data);
      config.headers["Content-Type"] = "application/json";
    } else {
      config.body = new FormData();
      for (let key in data) {
        config.body.append(key, data[key]);
      }
    }
  } else if (method === "GET" && data) {
    //处理GET请求
    const params = new URLSearchParams(data).toString();
    url += `?${params}`;
  }
  ///////////////////////////////////////////方法一抛错式登录过期///////////////////////////////////////////////////
  // return fetch(`${base}${url}`, config).then((res) => {
  //   if (res.status >= 200 && res.status < 400) {
  //     return res[returnType]();
  //   } else {
  //     return res.text().then((err) => {
  //       console.log(err, "err");
  //       if (res.status === 401) {
  //         //登录过期状态   清空token
  //         // useTokenStore.getState().changeToken("");
  //       }
  //       // toast("danger", err);
  //       return Promise.reject(err);
  //     });
  //   }
  // }) as Promise<R>;
  ///////////////////////////////////////////方法二请求体式返回状态码登录过期///////////////////////////////////////////////////
  return fetch(`${base}${url}`, config).then(async (res) => {
    // 在这里将响应体转换为 JSON 格式
    const responseData = await res.json();
    if (res.status >= 200 && res.status < 400) {
      // 返回已经解析的 JSON 数据
      if (responseData.code === 4001) {
        ElMessage({
          message: "登录过期，请重新登录",
          grouping: true,
          type: "warning",
        });
        setTimeout(() => {
          localStorage.removeItem("token");
          location.reload();
        }, 1500);
      }
      // 如果不等于200，说明请求后端判断，弹出后端返回错误信息
      if (responseData.code !== 200) {
        ElMessage({
          message: responseData.msg,
          grouping: true,
          type: "warning",
        });
      }
      return responseData;
    } else {
      // 在处理错误时使用 responseData
      console.log(responseData, "errorData");
      // 这里可以继续使用 responseData 处理其他逻辑
      // ...
      // 返回 Promise.reject(responseData) 表示请求失败
      return Promise.reject(responseData);
    }
  });
}
