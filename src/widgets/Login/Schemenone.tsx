import { useState } from "react";
import userTokenVessel from "@/store/userToken_vessel";
import { Button, Input } from "@heroui/react";
import { usetoast } from "@/store/contextmodel";

export default function Login() {
  //1号登录只有登录无注册
  const [username, setusername] = useState(""); //账号
  const [password, setpassword] = useState(""); //密码

  const changeToken = userTokenVessel((state) => state.changeToken); //调用store
  const changeUser = userTokenVessel((state) => state.changeUserInfo); //调用
  const goLogin = () => {
    if (username == "" || password == "") {
      usetoast("请输入账号密码");
    } else {
      //登录
      if (username == "1") {
        changeUser({
          role: "管理员", //角色
        });
      } else {
        changeUser({
          role: "普通号",
        });
      }
      changeToken("token");
      usetoast("登录成功", "success");
      location.reload();
    }
  };
  return (
    <div className=" w-[100%] h-[100vh] flex flex-col justify-center items-center bg-[url('/loginback.jpg')] bg-cover ">
      <section>
        <div className="flex justify-center items-center">
          {/* <img src="/loginLogo.svg" alt="" />  图标*/}
          <p className=" ml-[20px] text-[31px] text-white font-extrabold">
            后台框架
          </p>
        </div>
        <br />
        <Input
          value={username}
          onValueChange={setusername}
          className="inputStyle text-white "
          isClearable
          color="danger"
          variant="bordered"
          radius="sm"
          size="lg"
          placeholder="请输入账号"
          startContent={<i className=" material-icons">api</i>}
        />
        <br />
        <Input
          value={password}
          onValueChange={setpassword}
          type="password"
          className="  inputStyle text-white"
          color="danger"
          variant="bordered"
          radius="sm"
          size="lg"
          placeholder="请输入密码"
          startContent={<i className=" material-icons">api</i>}
          onKeyDown={(e) => {
            if (e.nativeEvent.keyCode == 13) {
              goLogin();
            }
          }}
        />
        <Button
          className=" mt-[20px] bg-[#2773F2]  w-[365px] h-[46px] text-white text-[20px] "
          onPress={goLogin}
        >
          登录
        </Button>
      </section>
    </div>
  );
}
