<template>
  <div class="prTable">
    <div v-if="headShow" class="head">
      <slot name="tableHead"></slot>
    </div>
    <el-table
      class="tableClass"
      ref="table"
      size="small"
      :border="border"
      :data="tableData"
      style="width: 100%"
      :row-key="rowKey"
      :default-expand-all="defaultExpandAll"
      :lazy="lazy"
      :load="load"
      :tree-props="{ children: childrenName, hasChildren: haveChild }"
      @selection-change="handleSelectionChange"
      @select="select"
      :span-method="spanMethod"
      @expand-change="expandChange"
      :highlight-current-row="highlightRow"
      @row-click="handleRowClick"
      :height="tableHight"
    >
      <slot name="tableColumn"></slot>
    </el-table>
    <el-pagination
      v-if="paginationShow"
      :currentPage="curr"
      background
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout=" sizes, prev, pager, next"
      :hide-on-single-page="false"
      :total="count"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
// import { v4 as uuidv4 } from "uuid";
// import $ from "jquery";
import { ITableProps } from "@/interface/moudle/dataType";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import Sortable from "sortablejs";
import { ElTable } from "element-plus";
export default defineComponent({
  props: {
    tableData: {
      // 表格数据
      type: Array,
      require: true,
    },
    rowKey: {
      // 行key
      type: String,
      default: "id",
    },
    headShow: {
      //是否显示表格头部的div
      type: Boolean,
      default: true,
    },
    lazy: {
      //树形数据懒加载开启
      type: Boolean,
      default: false,
    },
    defaultExpandAll: {
      // 展开
      type: Boolean,
      default: false,
    },
    boxHeight: {
      // 表格下面留白部分尺寸  calc(100vh - ？）；
      type: String,
      default: "",
    },
    prHeight: {
      // 表格下面留白部分尺寸
      type: String,
    },
    paginationShow: {
      // 分页器
      type: Boolean,
      default: false,
    },
    curr: {
      // 当前页
      type: Number,
      default: 1,
    },
    pageSize: {
      // 页尺寸
      type: Number,
      default: 10,
    },
    count: {
      // 总条数
      type: Number,
      default: 0,
    },
    childrenName: {
      //子集的名称
      type: String,
      default: "children",
    },
    haveChild: {
      //子集的名称
      type: String,
      default: "haveChild",
    },
    border: {
      //表格是否显示边线
      type: Boolean,
      default: true,
    },
    spanMethod: {
      // 合并表格方法 查看elementplus
      type: Function,
    },
    sortRowDrop: {
      // 是否开启表格拖拽功能
      type: Boolean,
      default: false,
    },
    prPadding: {
      // 是否不设置表格边距
      type: String,
      default: "0 15px 15px 15px",
    },
    highlightRow: {
      // 是否设置表格点击行的高亮
      type: Boolean,
      default: false,
    },
    tableHight: {
      // 表格的高度
      type: Number,
    },
  },
  // data() {
  //   return {
  //     tableId: uuidv4(),
  //   };
  // },
  // mounted() {
  //   const boxHeight = this.$props.boxHeight;
  //   const prHeight = this.$props.prHeight;
  //   $(`#${this.tableId}`).css({
  //     height: prHeight ? prHeight : `calc(100vh - ${boxHeight})`,
  //     overflow: "auto",
  //   });
  //   if (this.$props.prPadding) {
  //     $(`#${this.tableId}`).css({
  //       padding: "0",
  //       "border-radius": "0",
  //     });
  //   }
  // },
  emits: [
    "load", //子表格加载函数
    "paginationChange", // 点击分页函数
    "handleSelectionChange", //点击多选函数
    "expandChange", //点击展开缩放函数
    "rowDrop", //拖动列函数
    "handleRowClick", // 行点击事件
    "select", // 当用户手动勾选数据行的 Checkbox 时触发的事件
  ],
  setup(props: ITableProps, { emit }) {
    const table = ref<InstanceType<typeof ElTable>>();
    const state = reactive({
      currentPage: props.curr,
    });
    //加载子表格方法
    const load = (row: any, treeNode: any, resolve: any) => {
      emit("load", row, treeNode, resolve);
    };
    //点击分页 上一页或下一页方法

    const handleCurrentChange = (num: number) => {
      const param = {
        size: props.pageSize,
        curr: num,
      };
      emit("paginationChange", param);
    };
    //点击分页 每页展示多少条方法
    const handleSizeChange = (num: number) => {
      const param = {
        size: num,
        curr: 1,
      };
      emit("paginationChange", param);
    };
    //单选或者多选时候触发
    const handleSelectionChange = (val: any) => {
      emit("handleSelectionChange", val);
    };
    //单选或者多选时候触发
    const select = (val: any, row: any) => {
      emit("select", val, row);
    };
    //点击展开获取缩放回调
    const expandChange = (row: any, flag: any) => {
      emit("expandChange", row, flag);
    };
    // 点击某一行的时候触发事件
    const handleRowClick = (row: any) => {
      emit("handleRowClick", row);
    };

    // //实现拖拽功能
    // onMounted(() => {
    //   if (props.sortRowDrop) {
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     const tableRef = $(table.value.$el).find("tbody")[0];
    //     // 表格中需要实现行拖动，所以选中tr的父级元素
    //     Sortable.create(tableRef, {
    //       disabled: !props.sortRowDrop, //使用禁用
    //       onEnd(param: any) {
    //         emit("rowDrop", param);
    //       },
    //     });
    //   }
    // });
    return {
      load,
      ...toRefs(state),
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      expandChange,
      handleRowClick,
      select,
      table,
    };
  },
});
</script>


<style lang="scss" scoped>
.prTable {
  width: 100%;
  // padding: 0 15px 15px 15px;
  padding: v-bind(prPadding);
  border-radius: 15px;
  background-color: #fff;

  .el-pagination {
    text-align: right;
    margin: 10px 0;
    padding: 0px;
  }
  .el-table--mini .el-table__cell {
    padding: 4px 0;
  }
  .el-table .cell {
    line-height: 25px;
  }

  .tableClass {
    .el-table__fixed {
      height: 100% !important;
    }
  }
}
</style>
