import React, { useEffect } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import route from "../userouter";
import userTokenVessel from "@/store/userToken_vessel";
import { usebegin } from "@/store/contextmodel";
import "./css/Menu.css";

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): any => ({
  key,
  icon,
  children,
  label,
  type,
});
export interface Menu_Item {
  label: string;
  key: string;
  icon?: string;
}

export const menuConfig = [
  {
    label: "首页",
    key: "/",
    icon: "shopping_cart_checkout", //复制谷歌图标
    // icon: "Pricecontrolicon",  //图片
  },
  {
    label: "封装表格试列",
    key: "/figure",
    icon: "apps",
  },
  {
    label: "表单-封装",
    key: "/from",
    icon: "bolt",
  },
  {
    label: "我是文件",
    icon: "api",
    key: "/menu-file", //父亲类建议加上key  避免报错
    children: [
      {
        label: "跳转",
        key: "/ss",
      },
      {
        label: "文件",
        key: "/sub-file",
        icon: "",
        children: [
          {
            label: "子菜单",
            key: "/www",
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

const PackingMu = (props: { coll: boolean }) => {
  const takestore: any = usebegin(); //本地存储
  const userInfo: any = userTokenVessel.getState().userInfo;
  // const [clickAdd, setclickAdd]: any = useState([window.location.pathname]); //点击添加菜单标签

  const generateMenuItems = (itemsConfig: any, openKeys: any) => {
    return itemsConfig
      .filter(
        (item: any) => !item.roles || item.roles.includes(userInfo.username)
      )
      .map((item: any) => {
        // const iconPath =
        //   openKeys[0] === item.key ? `after${item.icon}` : item.icon;
        const children = item.children
          ? generateMenuItems(item.children, openKeys)
          : undefined;
        return getItem(
          item.label,
          item.key,
          // 图片图标
          // <img
          //   className="w-[14px] h-[14px]"
          //   src={`/MenuIcon/${iconPath}.png`}
          // />,
          // 谷歌图标
          <span>
            <i className="text-lg font-black material-icons">{item.icon}</i>
          </span>,
          children
        );
      });
  };
  const menuItems = generateMenuItems(menuConfig, takestore.openKeys);
  const handleMenuClick = (el: { key: string; keyPath: string[] }) => {
    takestore.setclickAdd([...new Set([...takestore.clickAdd, el.key])]);
    takestore.setopenKeys(el.keyPath);
    route.navigate(el.key);
  };
  // 过滤点击菜单后菜单tab数据
  function flattenMenu(menu: any, paths: any) {
    return menu.reduce((result: any, item: any) => {
      // 如果当前项的key匹配，加入结果数组
      if (paths.includes(item.key)) {
        result.push(item);
      }
      // 如果有子菜单，递归处理子菜单并加入结果
      if (item.children) {
        result.push(...flattenMenu(item.children, paths)); // 使用扩展运算符将子菜单项添加到数组
      }
      return result;
    }, []);
  }
  useEffect(() => {
    takestore.settabList(flattenMenu(menuConfig, takestore.clickAdd));
  }, [takestore.clickAdd]);
  const ensuredOpenKeys = Array.isArray(takestore.openKeys)
    ? takestore.openKeys
    : takestore.openKeys
    ? [takestore.openKeys]
    : [];
  return (
    <div>
      <div className="text-white text-md mb-2 border-b-1 border-white bg-[#20222a]  flex justify-center h-[64px] items-center">
        {!props.coll ? (
          <p className="font-black text-[17px]">系 统</p>
        ) : (
          <div className="cube-box48">
            <div className="cube48">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
      <Menu
        style={{ background: "#20222A" }}
        mode="inline"
        theme="light"
        defaultSelectedKeys={ensuredOpenKeys}
        defaultOpenKeys={ensuredOpenKeys}
        selectedKeys={ensuredOpenKeys}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default PackingMu;
