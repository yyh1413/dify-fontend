import { computed, reactive } from "vue";
import { ITableAttr, ITableFun } from "@/interface/moudle/dataType";
import { ITableData } from "@/interface/moudle/dataType";
type ITableBild = {
  bind: ITableAttr;
  on: ITableFun;
};
interface ITableReturn {
  tableState: ITableData;
  prTable: ITableBild;
}
/**
 * 表格共通封装的hook
 *
 * @param bind 表格bind的属性
 * @param on 表格绑定的方法
 * @param paginationCallBack // 点击分页的回调函数
 * @returns ITableReturn
 */
export const useTableState = (
  bind?: ITableAttr,
  on?: ITableFun,
  paginationCallBack?: () => void
): ITableReturn => {
  const tableState = reactive<ITableData>({
    data: [],
    curr: 1, // 当前页
    count: 0, // 总条数
    size: 10, // 页尺寸
  });
  //点击分页获取分页后数据
  const paginationChange = ({ curr, size }: { curr: number; size: number }) => {
    tableState.curr = curr;
    tableState.size = size;
    paginationCallBack?.();
  };
  //表格参数
  const prTable = reactive({
    bind: {
      tableData: computed(() => tableState.data),
      paginationShow: true,
      count: computed(() => tableState.count),
      curr: computed(() => tableState.curr),
      pageSize: computed(() => tableState.size),
      ...bind,
    },
    on: {
      paginationChange,
      ...on,
    },
  });
  return {
    tableState,
    prTable,
  };
};
