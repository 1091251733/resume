<script setup>
import { reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useBeginStore } from "../store/contextmodel";
import { useWindowWidth, loginBg } from "@/store/utiles";
import { Login } from "@/api/useApi";

const beginStore = useBeginStore(); //本地存储
const windowWidth = useWindowWidth(); //监听页面宽度
const data = reactive({
  username: "", //账号
  password: "", //密码
  affirmpss: "", //确认密码
  type: "登录",
});
onMounted(() => {
  if (beginStore.disclosedBallot) {
    //记住密码
    data.username = beginStore.curtain;
    data.password = beginStore.encipherment;
  }
  loginBg(); //登录背景
});
const switchover = (val, type) => {
  //切换登录状态
  if (type) {
    data.username = "";
    data.password = "";
    data.affirmpss = "";
    data.type = val;
  } else {
    data.type = val;
  }
};
const rememberfun = (val) => {
  //记住账户
  beginStore.setDisclosedBallot(val);
};
const goLogin = () => {
  if (data.type == "登录") {
    if (data.username == "" || data.password == "") {
      ElMessage({
        message: "请输入完整信息",
        grouping: true,
        type: "warning",
      });
    } else {
      Login({
        username: data.username,
        password: data.password,
      }).then((res) => {
        if (res.code == 200) {
          beginStore.setLoginInformation(res.data);
          beginStore.setToken(res?.data?.userinfo?.token);
          ElMessage({
            message: "登录成功",
            grouping: true,
            type: "success",
          });
          location.reload();
          if (beginStore.disclosedBallot) {
            //记住密码
            beginStore.setCurtain(data.username);
            beginStore.setEncipherment(data.password);
          }
        }
      });
    }
  } else {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
    if (data.username == "" || data.password == "") {
      ElMessage({
        message: "请输入注册账号或密码",
        grouping: true,
        type: "warning",
      });
    } else if (data.password !== data.affirmpss) {
      ElMessage({
        message: "两次密码不一致",
        grouping: true,
        type: "warning",
      });
    } else if (!regex.test(data.affirmpss)) {
      ElMessage({
        message: "密码至少10位，且必须包含大小写字母",
        grouping: true,
        type: "warning",
      });
    } else {
      ElMessage({
        message: "注册成功",
        grouping: true,
        type: "success",
      });
      switchover("登录");
      //   register({
      //     username: data.username,
      //     password: data.password,
      //   }).then((res) => {
      //     // console.log(res);
      //     if (res.code == 200) {
      //       ElMessage({
      //         message: "注册成功",
      //         grouping: true,
      //         type: "success",
      //       });
      //       switchover("登录");
      //     }
      //   });
    }
  }
};
</script>
<template>
  <ul class="elementBox">
    <li class="totalcontainer">
      <div class="laya-please layer-1"></div>
      <div class="laya-please layer-2"></div>
      <div class="container1">
        <div class="laya-please layer-3"></div>
        <div class="laya-please layer-4"></div>
        <div class="laya-please layer-5"></div>
        <div class="laya-please layer-6"></div>
      </div>
      <div class="container2">
        <div class="laya-please layer-7"></div>
        <div class="laya-please layer-8"></div>
      </div>
    </li>
    <li class="absolute">
      <div
        :class="
          'LoginBox flex justify-center w-full min-w-[300px] z-50 ' +
          (windowWidth < 700 ? 'w-[100%]' : 'w-[45%]')
        "
      >
        <div
          :class="
            'chldbox baidushowd ' +
            (windowWidth < 700 ? ' w-[360px]' : 'w-[470px] p-[30px] ')
          "
        >
          <h2
            class="mb-[44px] text-[22px] font-bold flex justify-center text-[#092F65]"
          >
            {{ data.type == "登录" ? "账 号 登 录" : "创 建 账 号" }}
          </h2>
          <div class="codep">
            <el-input
              size="large"
              style="height: 50px"
              v-model="data.username"
              :placeholder="`请输入${data.type}账号`"
            />
          </div>
          <div class="codep">
            <el-input
              size="large"
              type="password"
              style="height: 50px"
              v-model="data.password"
              show-password
              :placeholder="`请输入${data.type}密码`"
            />
          </div>
          <div v-show="data.type == '注册'" class="codep">
            <el-input
              size="large"
              type="password"
              style="height: 50px"
              v-model="data.affirmpss"
              show-password
              :placeholder="`请再次输入${data.type}密码`"
            />
          </div>
          <br />
          <div class="flex justify-between">
            <el-checkbox
              v-model="beginStore.disclosedBallot"
              @change="rememberfun"
              label="记住账户"
              size="large"
            />
            <div class="text-[12px] flex items-center">
              <span v-show="data.type == '登录'" class="text-foreground-500"
                >没有账号</span
              >
              <span
                @click="switchover(data.type == '登录' ? '注册' : '登录', true)"
                class="ml-2 cursor-pointer text-[#695DFF]"
              >
                点此{{ data.type == "登录" ? "注册" : "登录" }}
              </span>
            </div>
          </div>
          <button
            @click="goLogin"
            class="rounded-[5px] w-full text-[16px] h-[50px] mt-[70px] text-white hover:bg-[#877DFF] bg-[#695DFF]"
          >
            {{ data.type }}
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>
<style >
@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
<style scoped lang="less">
.elementBox {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  .codep {
    margin-top: 20px;
    p {
      margin-bottom: 10px;
      color: #646566;
    }
  }
  .LoginBox {
    .baidushowd {
      background-color: white;
      border-radius: 8px;
      box-sizing: border-box;
      padding: 25px;
      box-shadow: 0px 0px 20px 1px rgba(45, 140, 240, 0.3);
    }
    .chldbox {
      .linhgth {
        color: #323233;
      }
    }
  }
}

.totalcontainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container1 {
  transform: scaleX(1.11);
}
.container2 {
  transform: scaleX(1.25);
}
.layer-1 {
  height: 100%;
  width: 100%;
  background-color: #fed8c1;
}

.layer-2 {
  background: url("/logintowBgimg/lay2.svg") no-repeat center center fixed;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.layer-3 {
  background: url("/logintowBgimg/lay3.svg") no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
}
.layer-4 {
  background: url("/logintowBgimg/lay4.svg") no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
}
.layer-5 {
  background: url("/logintowBgimg/lay5.svg") no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.55s
    both;
}
.layer-6 {
  background: url("/logintowBgimg/lay6.svg") no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.75s
    both;
}
.layer-7 {
  background: url("/logintowBgimg/lay7.svg") no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.85s
    both;
}
.layer-8 {
  background: url("/logintowBgimg/lay8.svg") no-repeat center center fixed;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.9s both;
}
.laya-please {
  position: absolute;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0px;
}
</style>
