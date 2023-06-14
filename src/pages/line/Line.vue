
<template>
  <div class="container">
    <div class="container_top mb_15">
      <h4>条线管理</h4>
      <div>
        <el-form label-width="80px" :model="form" ref="formRef" size="small">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item
                label="条线名"
                prop="sprintName"
                class="no-item-style"
              >
                <el-input
                  v-model="form.sprintName"
                  maxlength="50"
                  placeholder="请输入名称"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="条线负责人"
                prop="quarter"
                class="no-item-style"
              >
                <el-select
                  v-model="form.quarter"
                  placeholder="请选择条线负责人"
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
            <el-col :span="5">
              <el-form-item
                label="条线组成员"
                prop="quarter"
                class="no-item-style"
              >
                <el-select
                  v-model="form.quarter"
                  placeholder="请选择条线组成员"
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

            <el-col :span="9" style="text-align: right">
              <ButtomGroup @handleClickEmit="handleClickEmit" />
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="container_bottom">
      <PrTable
        v-bind="prTable.bind"
        v-on="prTable.on"
        v-loading="state.loading"
      >
        <template v-slot:tableColumn>
          <el-table-column label="条线名" prop="sprintName">
            <template #default="scope">
              <span @click="handlePge(scope.row)" class="cup">
                {{ scope.row.sprintName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="条线负责人" prop="quarter" />
          <el-table-column label="条线组成员" prop="quarter" />
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button link @click="edit(scope.row)" type="primary"
                >编辑</el-button
              >
              <el-button link @click="del(scope.row)" type="primary"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>
      </PrTable>
    </div>
  </div>
  <Dialog
    :dialogVisible="dialog"
    :title="title"
    @changeVisible="dialog = !dialog"
    @onSubmit="addSubmit"
    dialogHeight="80%"
    dialogWidth="500px"
    :loading="loading"
  >
    <template v-slot:content>
      <Form ref="collectionRef" :row="row" />
    </template>
  </Dialog>
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
import Dialog from "@/components/dialog/Dialog.vue";
import Form from "./components/Form.vue";
import ButtomGroup from "@/pages/components/buttomGroup/ButtomGroup.vue";
import { ElMessageBox } from "element-plus";
import { NEED } from "@/constants/routerUrl";
import { useRouter } from "vue-router";
// useRouter 全局路由对象
const router = useRouter();
onMounted(() => {
  featchData();
  getQuarterData();
});
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
const { tableState, prTable } = useTableState({ prPadding: "none" }, undefined);

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
const edit = (row?: any) => {
  state.dialog = true;
  state.title = "编辑条线";
  state.row = row;
};

const handleClickEmit = (param: string) => {
  console.log(param);
  switch (param) {
    case "add":
      state.dialog = true;
      state.title = "新建条线";
      state.row = undefined;
      break;
    case "search":
      tableState.curr = 1;
      featchData();
      break;
    case "reset":
      state.form.sprintName = "";
      state.form.startDate = "";
      state.form.endDate = "";
      state.form.quarter = "";
      state.form.date = "";
      tableState.curr = 1;
      featchData();
      break;
  }
};
const del = (row: any) => {
  //删除
  ElMessageBox.confirm(
    "此操作将删除本条线下关联的所有需求和任务，是否继续？",
    "提示",
    {
      type: "warning",
    }
  ).then(async () => {
    const param = {
      dataId: row?.id,
    };
    state.loading = true;
    await api
      .delSprintData(param)
      .then(() => {
        successMessage("删除成功");
        featchData();
      })
      .catch((re) => {
        errorMessage(re.msg);
      });
    state.loading = false;
  });
};
const addSubmit = () => {
  collectionRef.value.formRef.validate(async (valid: boolean) => {
    // 校验不通过
    if (!valid) {
      return;
    }
    state.loading = true; // 打开遮罩
    state.dialog = false;
    const form = collectionRef.value.form;
    const param = { ...form };
    await api
      .saveSprintData(param)
      .then(() => {
        successMessage("保存成功");
        state.dialog = false;
        tableState.curr = 1;
        featchData();
      })
      .catch((re) => {
        errorMessage(re.msg);
      });
    state.loading = false; // 关闭遮罩
  });
};
const handlePge = (row: any) => {
  console.log(row);
  const params = {
    sprint: "sprint2",
  };
  let path: string = urlEncode(NEED, params);
  router.push(path);
};
const { loading, form, dialog, row, title, quarterList } = toRefs(state);
</script>
<style lang="scss" scoped>
@import "../components/css/form.scss";
</style>


