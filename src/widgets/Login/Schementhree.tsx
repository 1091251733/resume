import { useState, useEffect } from "react";
import { produce } from "immer";
import { usetoast, usebegin } from "@/store/contextmodel";
import { Login, register } from "@/api/useApi";
import { Button, Input } from "@heroui/react";
import userTokenVessel from "@/store/userToken_vessel";
import { useWindowWidth } from "@/store/utile";
export default function LoginRegistration() {
  const windowWidth = useWindowWidth();
  const changeToken = userTokenVessel((state) => state.changeToken); //调用store
  const changeUser = userTokenVessel((state) => state.changeUserInfo); //调用
  const takestore: any = usebegin();
  const [data, setData] = useState({
    username: "", //账号
    password: "", //密码
    affirmpss: "", //确认密码
    imgcode: "", //图形验证码
    type: "登录",
  });
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
  function switchover(val: string) {
    setData(
      produce((pre) => {
        pre.type = val;
      })
    );
  }

  return (
    <div
      className={`h-[100vh] flex justify-center items-center bg-cover  ${
        windowWidth < 700 ? " bg-[#add3ff2c]" : ""
      }`}
    >
      <div
        className={
          "flex justify-center " + (windowWidth < 700 ? "w-[90%]" : "w-[45%]")
        }
      >
        <div
          className={
            "chldbox " +
            (windowWidth < 700
              ? "bg-white rounded-[8px] p-[25px] shadow-[0px_0px_20px_1px_rgba(45,140,240,0.3)]"
              : "w-[470px] p-[30px]")
          }
        >
          <img className="w-full mb-6" src="/loginBgnav.png" alt="" />
          <div className="flex items-center gap-4 mb-[44px] text-[22px] font-bold">
            <h2
              className={`cursor-pointer text-[#092F65] ${
                data.type == "登录" ? "" : "text-[20px] text-[#677187]"
              }`}
              onClick={() => switchover("登录")}
            >
              用户登录
            </h2>
            <h2
              className={`cursor-pointer text-[#092F65] ${
                data.type != "登录" ? "" : "text-[20px] text-[#677187]"
              }`}
              onClick={() => switchover("注册")}
            >
              注册
            </h2>
          </div>
          <div className="mt-[20px]">
            <div className="mb-2 ml-2 text-slate-600">账号</div>
            <Input
              size="lg"
              value={data.username}
              placeholder={`请输入${data.type}账号`}
              onChange={(val: any) => {
                setData(
                  produce((pre) => {
                    pre.username = val.target.value;
                  })
                );
              }}
            />
          </div>
          <div className="mt-[20px]">
            <div className="mb-2 ml-2 text-slate-600">密码</div>
            <form onSubmit={(event) => event.preventDefault()}>
              <Input
                size="lg"
                type="password"
                autoComplete=""
                value={data.password}
                placeholder={`请输入${data.type}密码`}
                onKeyDown={(e) => {
                  if (e.nativeEvent.keyCode == 13) {
                    goLogin();
                  }
                }}
                onChange={(val: any) => {
                  setData(
                    produce((pre) => {
                      pre.password = val.target.value;
                    })
                  );
                }}
              />
            </form>
          </div>
          {data.type == "注册" && (
            <>
              <div className="mt-[20px]">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <Input
                    size="lg"
                    type="password"
                    autoComplete=""
                    value={data.affirmpss}
                    placeholder={`请再次输入${data.type}密码`}
                    onChange={(val: any) =>
                      setData(
                        produce((pre) => {
                          pre.affirmpss = val.target.value;
                        })
                      )
                    }
                  />
                </form>
              </div>
            </>
          )}
          {data.type == "登录" && (
            <div className="flex items-center mt-5">
              <Input
                size="lg"
                autoComplete=""
                placeholder="请输入验证码"
                value={data.imgcode}
                onChange={(val: any) =>
                  setData(
                    produce((pre) => {
                      pre.imgcode = val.target.value;
                    })
                  )
                }
              />
              {/* 验证码图片 */}
              {/* <img
                className="h-[45px] rounded-lg ml-2 cursor-pointer"
                src={verifyData.img}
                onClick={init}
              /> */}
            </div>
          )}

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
      {windowWidth >= 700 && (
        <div
          style={{ backgroundImage: `url('/bgimg.png')` }}
          className="w-[55%] h-full flex justify-center items-center "
        ></div>
      )}
    </div>
  );
}
