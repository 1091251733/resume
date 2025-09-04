import { usebegin } from "@/store/contextmodel";
import { CloseOutlined } from "@ant-design/icons";
import route from "@/userouter";
import "./index.css";
export default function MenuTabs() {
  const takestore: any = usebegin(); //本地存储
  //   const navigate = useNavigate();
  const { pathname } = location || {};
  const changeHistory = (index: number, item: any) => {
    //删除
    if (index) {
      let copyList = [...takestore.tabList];
      let codAddList = [...takestore.clickAdd];
      const codAddindex = codAddList.indexOf(item.key); // 根据内容找到索引
      copyList.splice(index, 1);
      codAddList.splice(codAddindex, 1);
      takestore.setclickAdd(codAddList);
      takestore.settabList(copyList);
    }
  };
  return (
    <div className="p-[2px] overflow-hidden box-border flex items-center bg-[#FBFBFB]">
      {takestore.tabList.map((item: any, index: number) => (
        <div
          className="px-[20px] h-[30px] cursor-pointer text-[#91929E] text-[14px] font-[400] flex items-center tabs-container-text relative"
          key={index}
          style={{
            color: pathname === item.key ? "#3F8CFF" : "",
            boxSizing: "border-box",
            borderBottom:
              pathname === item.key ? "#3F8CFF solid 1px" : "#FBFBFB solid 1px",
          }}
          //   onClick={(even) => scrollToBottom(even)}
        >
          <span
            className="whitespace-nowrap"
            onClick={() => {
              takestore.setopenKeys([item.key]);
              route.navigate(item.key);
            }}
          >
            {item.label}
          </span>
          {index !== 0 && (
            <span className="text-[#707070] tabs-container-text-close absolute top-1 right-1">
              <CloseOutlined
                width={"4px"}
                height={"4px"}
                onClick={() => changeHistory(index, item)}
              />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
