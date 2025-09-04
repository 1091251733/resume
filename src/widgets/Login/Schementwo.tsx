import { useState, useEffect } from "react";
import { produce } from "immer";
import { usebegin, usetoast } from "@/store/contextmodel";
import { Login, register } from "@/api/useApi";
import { Button, Checkbox, Input } from "@heroui/react";
import userTokenVessel from "@/store/userToken_vessel";
import { loginBg, useWindowWidth } from "@/store/utile";
// import "./css/Schementwo.css"; //登录山背景css
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
    if (data.type == "登录") {
      //登录
      if (data.username == "" || data.password == "") {
        usetoast("请输入完整信息");
      } else {
        Login({
          username: data.username,
          password: data.password,
        }).then((res: any) => {
          if (res.code == 200) {
            changeUser({
              ...res.data?.userinfo,
              role: "普通号", //角色
            });
            changeToken(res.data.userinfo.token);
            usetoast("登录成功", "success");
            location.reload();
            if (takestore.disclosedBallot) {
              //记住密码
              takestore.setcurtain(data.username);
              takestore.setencipherment(data.password);
            }
          }
        });
      }
    } else {
      //注册
      if (data.username == "" || data.password == "") {
        usetoast("请输入注册账号或密码");
      } else if (data.password !== data.affirmpss) {
        usetoast("两次密码不一致");
      } else {
        register({
          username: data.username,
          password: data.password,
        }).then((res: any) => {
          if (res.code == 200) {
            usetoast("注册成功", "success");
            switchover("登录");
          }
        });
      }
    }
  };
  const switchover = (val: string) => {
    //切换登录/注册
    setdata(
      produce((pre) => {
        pre.type = val;
      })
    );
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
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
      </>
      <div className="absolute ">
        <div
          className={
            "LoginBox flex justify-center w-full min-w-[300px] z-50 " +
            (windowWidth < 700 ? "w-[100%]" : "w-[45%]")
          }
        >
          <div
            className={
              "bg-white rounded-[8px] p-[25px] shadow-[0px_0px_20px_1px_rgba(45,140,240,0.3)] " +
              (windowWidth < 700 ? "w-[360px]" : "w-[470px] p-[30px]")
            }
          >
            <h2 className="mb-[44px] text-[22px] font-bold flex justify-center text-[#092F65] ">
              {data.type == "登录" ? "账 号 登 录" : "创 建 账 号"}
            </h2>

            <div className="mt-[20px]">
              <Input
                size="lg"
                value={data.username}
                placeholder={`请输入${data.type}账号`}
                onChange={(val: any) => {
                  setdata(
                    produce((pre) => {
                      pre.username = val.target.value;
                    })
                  );
                }}
              />
            </div>
            <div className="mt-[20px]">
              <form onSubmit={(event) => event.preventDefault()}>
                <Input
                  size="lg"
                  type="password"
                  autoComplete=""
                  value={data.password}
                  placeholder={`请输入${data.type}密码`}
                  onChange={(val: any) => {
                    setdata(
                      produce((pre) => {
                        pre.password = val.target.value;
                      })
                    );
                  }}
                />
              </form>
            </div>
            {data.type == "注册" ? (
              <>
                <div className="mt-[20px]">
                  <form onSubmit={(event) => event.preventDefault()}>
                    <Input
                      size="lg"
                      type="password"
                      autoComplete=""
                      value={data.affirmpss}
                      placeholder={`请再次输入${data.type}密码`}
                      onChange={(val: any) => {
                        setdata(
                          produce((pre) => {
                            pre.affirmpss = val.target.value;
                          })
                        );
                      }}
                    />
                  </form>
                </div>
              </>
            ) : (
              <></>
            )}
            <br />
            <div className=" flex justify-between ">
              <Checkbox
                color={"primary"}
                isSelected={takestore.disclosedBallot}
                onValueChange={(val: boolean) => {
                  takestore.setdisclosedBallot(val);
                }}
              >
                记住账户
              </Checkbox>
              <div className=" text-[12px] flex  items-center">
                {data.type == "登录" ? (
                  <span className="text-foreground-500">没有账号</span>
                ) : (
                  <></>
                )}
                <span
                  className={"ml-2 cursor-pointer " + "text-[#695DFF] "}
                  onClick={() => {
                    switchover(data.type == "登录" ? "注册" : "登录");
                    setdata(
                      produce((pre) => {
                        pre.username = ""; //账号
                        pre.password = ""; //密码
                        pre.affirmpss = ""; //确认密码
                      })
                    );
                  }}
                >
                  点此{data.type == "登录" ? "注册" : "登录"}
                </span>
              </div>
            </div>
            <Button
              className={
                "rounded-[5px] w-full text-[16px] h-[50px] mt-[70px] " +
                "bg-[#695DFF]"
              }
              color={"primary"}
              onPress={goLogin}
            >
              {data.type}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
