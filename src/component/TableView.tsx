/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

import { Table, TablePaginationConfig } from "antd";
interface TableViewProps<T> {
  api?: any;
  dataList?: any;
  apiState?: any;
  xScroll?: number;
  bordered?: boolean;
  rowKey?: keyof T;
  rowSelectionKey?: boolean;
  optionsPagintion?: boolean;
  columns: any[];
  size?: number;
  heightValue?: number;
  summaryList?: (string | number)[];
  type?: "checkbox" | "radio";
  compile?: (selectedRowKeys: React.Key[]) => void;
}
interface TableViewHandle {
  setState: React.Dispatch<React.SetStateAction<any>>;
  getList: (state: any) => void;
  queryList: (state?: any) => void;
  resetList: () => void;
  pagination: TablePaginationConfig;
  setPagination: React.Dispatch<React.SetStateAction<TablePaginationConfig>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  state: {
    total: number;
    dataList: any[];
  };
}
/**
 * 普通表格
 */
const TableView = forwardRef<TableViewHandle, TableViewProps<any>>(
  /***
   * api:获取数据API,
   * dataList: 表格数据 数组类型[] （传输dataList后api不必在传）
   * apiState:接口需要的查询条件(接口api需要参数必传,不需要非必须:参数内容), 默认传递参数
   * xScroll:X轴滚动
   * bordered：是否线条表格样式
   * rowKey:每行的key,不传默认随机数,
   * rowSelectionKey:显示多选true:显示
   * optionsPagintion:显示分页true:显示
   * columns:表头(必须传)  {title: "标题",dataIndex: "键名",}
   * size:每页多少条不传默认10
   * heightValue 表格高度，不传就默认撑满余下的空间
   * type ： "checkbox" | "radio"  表格多选还是单选
   * compile ： 选择表格后函数
   * summaryList:显示总计
   */
  (
    {
      api,
      dataList,
      apiState,
      xScroll,
      bordered,
      rowKey,
      rowSelectionKey,
      optionsPagintion,
      columns,
      size,
      heightValue,
      summaryList,
      type,
      compile,
    },
    ref
  ) => {
    /***
     * 将子组件的方法给父组件（函数编程写法），父组件 ref.current.方法名()调用
     * getList:重新查询table展示的数据,用于实现查询,
     * setPagination:手动修改分页,用于重置类的功能
     */
    useImperativeHandle(ref, () => ({
      setState,
      getList,
      queryList,
      resetList,
      pagination,
      setPagination,
      setLoading,
      selectedRowKeys,
      setSelectedRowKeys,
      state,
    }));
    const [afterfenye, setafterfenye] = useState({});
    const [height, setHeight] = useState(800);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys]: any = useState([]);
    const [state, setState]: any = useState({
      total: 0,
      dataList: [],
    });
    const [pagination, setPagination] = useState<TablePaginationConfig>({
      current: 1,
      pageSize: size ? size : 10,
    });

    const getResidueHeightByDOMRect = () => {
      const bodyHeight = document.body.offsetHeight; // 网页可见区域高 (包括边线的高)
      const tableBodyTop = document
        .getElementsByClassName("ant-table-body")[0]
        ?.getBoundingClientRect().top; // tableBody距离顶部距离
      const paginationHeight = 32 + 16 * 2; // 分页器高度(包括间距);
      const tabContentBottomPadding = 18; // tab子元素区域下padding
      const contentBottomPadding = 32; // content区域的底部padding
      const residueHeight =
        bodyHeight -
        tableBodyTop -
        paginationHeight -
        contentBottomPadding -
        tabContentBottomPadding;
      return residueHeight;
    };
    useEffect(() => {
      //高度自适应
      setHeight(getResidueHeightByDOMRect());
      window.onresize = () => {
        setHeight(getResidueHeightByDOMRect());
      };
      if (api) {
        getList(afterfenye);
      } else {
        setState({
          total: 1,
          dataList: [...dataList],
        });
      }
    }, [JSON.stringify(pagination), dataList]);

    const getList = async (state: any) => {
      const { current, pageSize } = pagination || {};
      setLoading(true);
      const result = await api({
        pageNum: current,
        pageSize: pageSize,
        ...apiState,
        ...state,
      });
      setLoading(false);
      handleResult(result);
    };

    const queryList = async (state?: any) => {
      const { current, pageSize }: any = pagination || {};
      setLoading(true);
      const result = await api({
        pageNum: 1,
        pageSize: pageSize,
        ...apiState,
        ...state,
      });
      if (current > 1 || pageSize !== size) {
        setPagination({
          current: 1,
          pageSize: size,
        });
      }
      if (state) {
        setafterfenye(state);
      }
      handleResult(result);
    };

    const resetList = async () => {
      setPagination({
        current: 1,
        pageSize: size,
      });
      setafterfenye({});
      setSelectedRowKeys([]);
      setLoading(true);
      const result = await api({
        pageNum: 1,
        pageSize: size,
        ...apiState,
        // ...state,
      });
      handleResult(result);
    };
    const handleResult = (result: any) => {
      //发送请求赋值
      const { rows, msg, total } = result.data || {}; //更具实际后端参数做修改
      setLoading(false);
      if (result.code !== 200) return;
      if (optionsPagintion) {
        setState((item: any) => ({
          ...item,
          total: total || 0,
          dataList: [...rows],
        }));
      } else {
        setState((item: any) => ({ ...item, dataList: [...rows] }));
      }
    };

    const rowSelection: any = {
      selectedRowKeys,
      onChange: (newSelectedRowKeys: any) => {
        setSelectedRowKeys(newSelectedRowKeys);
        if (compile) {
          compile(newSelectedRowKeys);
        }
      },
      fixed: true,
    };

    const setCurrentPage = (pagination: any) => {
      setPagination({ ...pagination });
      if (pagination.pageSize !== pagination?.pageSize) {
        setState({
          total: 0,
          dataList: [],
        });
      }
    };

    const totalNum = (str: any) => {
      const { dataList } = state || {};
      // 计算总量总计
      const total = dataList.reduce(
        (acc: any, item: any) => Number(acc) + Number(item[str]),
        0
      );
      return total || "-";
    };
    return (
      <>
        <Table
          scroll={{
            x: xScroll,
            y: heightValue || height,
          }}
          bordered={bordered}
          rowKey={rowKey}
          loading={loading}
          rowSelection={
            rowSelectionKey
              ? {
                  type,
                  ...rowSelection,
                }
              : false
          }
          pagination={
            optionsPagintion
              ? {
                  ...pagination,
                  total: state.total,
                  hideOnSinglePage: false,
                  showSizeChanger: true,
                }
              : false
          }
          onChange={setCurrentPage}
          columns={[...columns]}
          dataSource={state.dataList}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                {summaryList &&
                  summaryList.map((item: any, index: any) => {
                    return item === "总计" || item === "-" ? (
                      <Table.Summary.Cell index={index} key={index}>
                        <strong>{item}</strong>
                      </Table.Summary.Cell>
                    ) : (
                      <Table.Summary.Cell index={index} key={index}>
                        {totalNum(item)}
                      </Table.Summary.Cell>
                    );
                  })}
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </>
    );
  }
);

TableView.displayName = "TableView";

export default TableView;
