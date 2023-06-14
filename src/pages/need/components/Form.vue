<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-width="100px">
    <el-form-item label="需求名" prop="sprintName">
      <el-input
        v-model="form.sprintName"
        placeholder="请输入冲刺名"
        style="width: 300px"
      />
    </el-form-item>
    <el-form-item label="归属条线" prop="sprintName">
      <el-select
        v-model="form.quarter"
        placeholder="请选择归属条线"
        clearable
        multiple
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
    <el-form-item label="状态" prop="sprintName">
      <el-select
        v-model="form.quarter"
        placeholder="请选择状态"
        clearable
        multiple
      >
        <el-option
          v-for="item in quarterList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-tag type="warning" v-if="!flag">
        注：新建需求默认状态为【进行中】且不可更改，翻转需求状态至【已完成】
      </el-tag>
    </el-form-item>

    <el-form-item label="DUE" prop="sprintName">
      <el-date-picker
        v-model="form.sprintName"
        type="date"
        placeholder="请选择DUE"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
export default defineComponent({
  props: { row: Object },

  setup(props) {
    const formRef = ref();
    const state = reactive({
      flag: !!props.row, // true 编辑  flase 新建
      form: {
        sprintName: "",
        date: "",
        dataId: "",
      },
      rules: {
        sprintName: [
          { required: true, message: "请输入冲刺名", trigger: "change" },
        ],
        date: [
          { required: true, message: "请选择起止时间", trigger: "change" },
        ],
      },
    });
    onMounted(() => {
      if (props.row) {
        state.form.sprintName = props.row.sprintName;
        state.form.date = props.row.date;
        state.form.dataId = props.row.id;
      }
    });
    return {
      ...toRefs(state),
      formRef,
    };
  },
});
</script>
