//所有table表格必须使用这个类型
export interface ITableData {
  data: any[];
  curr?: number; // 当前页
  count?: number; // 总条数
  size?: number; // 页尺寸
  [key: string]: any;
}
// 数据字典数据类型
export interface IDictionary {
  id: number;
  note: string | undefined;
  pid: number;
  text: string;
  orderNo: number;
  value: string;
}
// 数据字典数据类型
export interface IDictionaryList extends IDictionary {
  childList: IDictionary[]; // 子集
}
//login 返回值
export interface ILogin {
  button_res: any[];
  jwttoken: string;
  menu_res: any[];
}
//表格属性
export interface ITableAttr {
  tableData?: any[]; // 表格数据
  rowKey?: string; // 行key
  headShow?: boolean; //是否显示表格头部的div
  lazy?: boolean; //树形数据懒加载开启
  defaultExpandAll?: boolean; // 展开表格子集
  boxHeight?: string; // 表格下面留白部分尺寸  calc(100vh - ？）；
  prHeight?: string; // 表格下面留白部分尺寸 ；
  paginationShow?: boolean; // 分页器是否开启
  curr?: number; // 当前页
  pageSize?: number; // 页尺寸
  count?: number; // 总条数
  childrenName?: string; //子集的名称.
  border?: boolean; //表格是否显示边线
  prPadding?: String; // 是否不设置表格边距
  spanMethod?: any; // 合并表格方法 查看elementplus
  sortRowDrop?: boolean; //表格是否显示边线
  highlightRow?: boolean; // 点击某一行是否高亮
  tableHight?: number; // 表格的高度
  haveChild?: string; //
}
// 表格方法
export interface ITableFun {
  paginationChange?: (param: any) => void; // 分页器触发回调
  handleSelectionChange?: (param: any) => void; //多选触发的回调
  handleRowClick?: (param: any) => void; //表格单选
  select?: (param: any, row: any) => void; //选择一行
  load?: (row: any, treeNode: any, resolve: any) => void; // 点击展开回调
}

//表格属性方法合一
export interface ITableProps extends ITableAttr, ITableFun {}

// 权限类型
export interface IPermission {
  authtype?: string;
  cusrequireid?: number;
  id: number;
  ispub?: string;
  name: string;
  orderno?: number;
  parentid?: number;
  type?: string;
  urlpath: string;
}
