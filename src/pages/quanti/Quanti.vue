
<template>
  <div class="container">
    <div class="container_top mb_15">
      <h4>开发量化得分</h4>
      <div>
        <el-form label-width="80px" :model="form" ref="formRef" size="small">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item
                label="已选冲刺"
                prop="quarter"
                class="no-item-style"
              >
                <el-select
                  v-model="form.quarter"
                  placeholder="请选择已选冲刺"
                  clearable
                >
                  <el-option
                    v-for="item in quarterList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="条线" prop="quarter" class="no-item-style">
                <el-select
                  v-model="form.quarter"
                  placeholder="请选择条线"
                  clearable
                >
                  <el-option
                    v-for="item in quarterList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="10" style="text-align: right">
              <ButtomGroup @handleClickEmit="handleClickEmit" hideAdd />
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="container_bottom">
      <div class="container_bottom_table">
        <PrTable
          v-bind="prTable.bind"
          v-on="prTable.on"
          v-loading="state.loading"
        >
          <template v-slot:tableColumn>
            <el-table-column label="开发者" prop="quarter" />
            <el-table-column label="工作量" prop="quarter" />
            <el-table-column
              label="占比（个人工作量/总工作量）"
              prop="quarter"
              width="180"
            />
          </template>
        </PrTable>
      </div>
      <div class="container_bottom_charts">
        <Charts />
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import {
  errorMessage,
  successMessage,
  useTableState,
  getQueryString,
  urlEncode,
} from "@/utils";
import { onMounted, reactive, toRefs, watch } from "vue";
import { ref } from "vue";
import api from "@/api/main";
import PrTable from "@/components/table/PrTable.vue";
import ButtomGroup from "@/pages/components/buttomGroup/ButtomGroup.vue";
import Charts from "./components/Charts.vue";

const formRef = ref();
const collectionRef = ref();
const urlParam = getQueryString()?.sprint || "";
const state = reactive({
  loading: false,
  dialog: false,
  title: "",
  row: undefined,
  quarterList: [] as any[],
  form: {
    sprintName: urlParam,
    startDate: "",
    endDate: "",
    quarter: "22",
    date: "",
  },
});
const { tableState, prTable } = useTableState(
  { prPadding: "none", paginationShow: false },
  undefined
);

const getQuarterData = async () => {
  await api
    .getQuarterData()
    .then(({ data }) => {
      // state.quarterList = data;
      state.quarterList = [
        { label: 1, value: "22" },
        { label: 11, value: "33" },
        { label: 12, value: "444" },
      ];
    })
    .catch((re) => {
      errorMessage(re.msg);
    });
};
//点击查询
const featchData = async () => {
  state.loading = true; // 打开遮罩
  const param = {
    curr: tableState.curr,
    size: tableState.size,
  };
  await api
    .getSprintDta(param)
    .then(({ data }) => {
      tableState.data = data.data;
      tableState.curr = data.curr;
      tableState.count = data.count;
      tableState.size = data.size;
    })
    .catch((re) => {
      errorMessage(re.msg);
    });
  state.loading = false; // 关闭遮罩
};

const handleClickEmit = (param: string) => {
  console.log(param);
  switch (param) {
    case "add":
      state.title = "新建条线";
      break;
    case "search":
      featchData();
      break;
    case "reset":
      state.form.sprintName = "";
      state.form.startDate = "";
      state.form.endDate = "";
      state.form.quarter = "";
      state.form.date = "";
      featchData();
      break;
  }
};
const { loading, form, dialog, row, title, quarterList } = toRefs(state);
</script>
<style lang="scss" scoped>
@import "../components/css/form.scss";
.container_bottom {
  padding-top: 20px;
  display: flex;
  &_table {
    flex: 4;
  }
  &_charts {
    flex: 6;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>


