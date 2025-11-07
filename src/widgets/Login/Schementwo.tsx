import { useState, useEffect } from "react";
import { produce } from "immer";
import { usebegin, usetoast } from "@/store/contextmodel";
import { Login, register } from "@/api/useApi";
import { Button, Checkbox, Input } from "@heroui/react";
import userTokenVessel from "@/store/userToken_vessel";
import { useWindowWidth } from "@/store/utile";

import "./css/dot.css"; //登录圆点背景css
export default function LoginRegistration() {
  //2号登录注册（山动画）
  const windowWidth = useWindowWidth();
  const changeToken = userTokenVessel((state) => state.changeToken); //调用store
  const changeUser = userTokenVessel((state) => state.changeUserInfo); //调用
  const takestore: any = usebegin();
  const [data, setdata] = useState({
    username: "", //账号
    password: "", //密码
    affirmpss: "", //确认密码
    type: "登录",
  });
  useEffect(() => {
    // loginBg(); //调用登录山背景
    setdata(
      produce((pre) => {
        pre.username = takestore.disclosedBallot ? takestore.curtain : ""; //账号
        pre.password = takestore.disclosedBallot ? takestore.encipherment : ""; //密码
      })
    );
  }, []);
  const goLogin = () => {
    changeToken("登进");
  };
  return (
    <div className="h-[100vh] flex justify-center items-center bg-cover background">
      {/* 登录山背景 */}
      {/* <div className="totalcontainer">
        <div className="laya-please layer-1"></div>
        <div className="laya-please layer-2"></div>
        <div className="container1">
          <div className="laya-please layer-3"></div>
          <div className="laya-please layer-4"></div>
          <div className="laya-please layer-5"></div>
          <div className="laya-please layer-6"></div>
        </div>
        <div className="container2">
          <div className="laya-please layer-7"></div>
          <div className="laya-please layer-8"></div>
        </div>
      </div> */}
      {/* 登录圆点背景 */}
      <>
        {[...Array(20)].map((item) => (
          <strong key={item}></strong>
        ))}
      </>
      <div>
        <div
          className={`flipInX_animated ${
            windowWidth > 700 ? " w-[600px]" : "w-[360px]"
          }`}
        >
          <div className="my_card">
            <div className="my_image">
              <p className="text71 my-[20px] text-2xl">欢迎访问我的顶部</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
