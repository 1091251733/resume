import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Layout, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  FormOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";

import route from "../../userouter";
import PackingMu from "@/component/Menu";
import Leftsidepopup from "@/component/Leftsidepopup";
import { goFullScreen, exitFullScreen, useWindowWidth } from "@/store/utile";
import { usebegin } from "@/store/contextmodel";
import MenuTabs from "@/component/MenuTabs";

const Afterlogging = () => {
  const { Header, Sider, Content } = Layout;
  const takestore: any = usebegin(); //本地存储
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const windowWidth = useWindowWidth(); //监听页面宽度
  const [collapsed, setCollapsed] = useState(false); //菜单关闭与展开
  const [amplification, setamplification] = useState(false); //是否放大页面
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const bigandSmle = (val: string) => {
    if (val === "放大") {
      setamplification(true);
      goFullScreen();
    } else {
      setamplification(false);
      exitFullScreen();
    }
  };
  //关闭与打开弹窗
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Leftsidepopup isOpen={isDialogOpen} onClose={closeDialog}>
        <div className="h-[100vh] bg-[#20222a]">
          <PackingMu coll={collapsed}></PackingMu>
        </div>
      </Leftsidepopup>
      <Layout style={{ minHeight: "100vh" }}>
        {windowWidth > 600 ? (
          <Sider
            style={{ background: "#20222a" }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <PackingMu coll={collapsed}></PackingMu>
          </Sider>
        ) : (
          <></>
        )}
        <Layout>
          <Header
            className="w-full flex items-center justify-between"
            style={{ padding: 0, background: colorBgContainer }}
          >
            {windowWidth > 600 ? (
              <Button
                onPress={() => setCollapsed(!collapsed)}
                className="bg-transparent w-[64px] h-[64px] text-[18px]"
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
            ) : (
              <Button
                onPress={openDialog}
                className="bg-transparent text-[20px]"
              >
                <MenuFoldOutlined />
              </Button>
            )}
            <div className="mr-[34px] flex items-center">
              {windowWidth > 600 && (
                <div className="text-[20px] cursor-pointer mx-2">
                  {amplification ? (
                    <FullscreenExitOutlined
                      onClick={() => bigandSmle("缩小")}
                    />
                  ) : (
                    <FullscreenOutlined onClick={() => bigandSmle("放大")} />
                  )}
                </div>
              )}
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button className="  bg-transparent  p-0 flex h-[50px]">
                    <img src="/heardeImg.png" alt="" />
                    {windowWidth > 600 && <p>用户名字</p>}
                    <DownOutlined />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" rounded-md ">
                  <div className="px-1 py-2">
                    <p
                      onClick={() => {}}
                      className="logOff h-[20px] cursor-pointer hover:text-[red]"
                    >
                      <FormOutlined /> 个人信息 12354
                    </p>
                  </div>
                  <div className="px-1 py-1">
                    <p
                      onClick={() => {
                        //退出登录
                        route.navigate("/");
                        takestore.setopenKeys("/");
                        localStorage.removeItem("token");
                        location.reload();
                      }}
                      className="logOff h-[20px] cursor-pointer hover:text-[red]"
                    >
                      <LogoutOutlined /> 退出登录
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Header>
          {/* 菜单tab */}
          {windowWidth > 600 && <MenuTabs></MenuTabs>}

          <Content
            style={{
              margin: windowWidth > 600 ? "24px 16px" : "8px",
              padding: windowWidth > 600 ? 24 : 8,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <RouterProvider router={route} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Afterlogging;
