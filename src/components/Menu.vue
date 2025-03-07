<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import RecursiveMenu from "./RecursiveMenu.vue";
// 获取 router 实例
const router = useRouter();
const props = defineProps(["collapse"]);
const jurisdiction = ""; //角色
const menuConfig = [
  {
    label: "首页",
    key: "/",
    icon: "shopping_cart_checkout",
  },
  {
    label: "封装表格试列",
    key: "/encapsulation",
    icon: "apps",
  },
  {
    label: "表单-封装",
    key: "/holdform",
    // roles: ["普通号", "普通员工"],
    icon: "bolt",
  },
  {
    label: "我是文件",
    key: "/bolt",
    icon: "bolt",
    children: [
      {
        label: "跳转",
        key: "/4",
      },
      {
        label: "文件",
        key: "/bolt2",
        children: [
          {
            label: "子菜单",
            key: "/cs",
          },
          {
            label: "子菜单2",
            key: "/8",
          },
        ],
      },
    ],
  },
];
const pitchOnfun = (key) => {
  //选中菜单函数
  router.push(key);
};
function filterMenuItems(items, role) {
  //过滤权限
  return items
    .filter((item) => {
      if (!("roles" in item)) {
        return true;
      } else {
        return item["roles"].includes(role);
      }
    })
    .map((item) => {
      if (item.children) {
        item.children = filterMenuItems(item.children, role);
      }
      return item;
    });
}

const filteredMenuConfig = computed(() =>
  filterMenuItems(menuConfig, jurisdiction)
);
</script>

<template>
  <div
    class="h-[48px] border-b-[2px] border-[#F5F7FA] text-white flex justify-center text-[17px] font-bold"
  >
    <div v-if="props.collapse" class="loading65">
      <div class="rectangle65"></div>
    </div>
    <p style="line-height: 48px" v-else>- _ 0</p>
  </div>
  <el-menu
    class="elmenu"
    active-text-color="#FF0000"
    background-color="#102041"
    text-color="#fff"
    @select="pitchOnfun"
    :default-active="useRoute().path"
    :collapse="props.collapse"
  >
    <template v-for="item in filteredMenuConfig">
      <RecursiveMenu :item="item" :index="String(item.key)" />
    </template>
  </el-menu>
</template>

<style scoped>
.elmenu {
  border: none;
}
/* 高亮时的菜单项背景色 */
.elmenu .el-menu-item.is-active {
  background-color: #daf1fd !important;
  border-left: 4px solid red;
}

/* 保持原有样式 */
.loading65 {
  position: relative;
  transform: rotate(45deg);
  margin-right: 33px;
}
.loading65:before,
.rectangle65::before,
.rectangle65::after {
  content: "";
  width: 14px;
  height: 14px;
  border: 2px solid red;
  border-radius: 4px;
  box-sizing: border-box;
  position: absolute;
}
.loading65:before {
  top: 0;
  left: 0;
  animation: eff651 4s ease-in-out infinite;
  animation-delay: 0.45s;
}
.rectangle65::before {
  top: 12px;
  left: 0px;
  animation: eff652 4s ease-in-out infinite;
  animation-delay: 0.65s;
}
.rectangle65::after {
  top: 0px;
  left: 12px;
  animation: eff653 4s ease-in-out infinite;
  animation-delay: 0.25s;
}
@keyframes eff651 {
  0%,
  10% {
    top: 0;
    left: 0;
  }
  15%,
  35% {
    top: 0;
    left: 12px;
  }
  40%,
  60% {
    top: 12px;
    left: 12px;
  }
  65%,
  85% {
    top: 12px;
    left: 0;
  }
  90%,
  100% {
    top: 0;
    left: 0;
  }
}
@keyframes eff652 {
  0%,
  10% {
    top: 12px;
    left: 0;
  }
  15%,
  35% {
    top: 0;
    left: 0;
  }
  40%,
  60% {
    top: 0;
    left: 12px;
  }
  65%,
  85% {
    top: 12px;
    left: 12px;
  }
  90%,
  100% {
    top: 12px;
    left: 0;
  }
}
@keyframes eff653 {
  0%,
  10% {
    top: 0;
    left: 12px;
  }
  15%,
  35% {
    top: 12px;
    left: 12px;
  }
  40%,
  60% {
    top: 12px;
    left: 0;
  }
  65%,
  85% {
    top: 0;
    left: 0;
  }
  90%,
  100% {
    top: 0;
    left: 12px;
  }
}
</style>
