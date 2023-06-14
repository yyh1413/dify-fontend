<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-width="100px">
    <el-form-item label="条线名" prop="sprintName">
      <el-input v-model="form.sprintName" placeholder="请输入冲刺名" />
    </el-form-item>
    <el-form-item label="条线负责人" prop="sprintName">
      <el-select
        v-model="form.quarter"
        placeholder="请选择条线负责人"
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
    <el-form-item label="条线组成员" prop="sprintName">
      <el-select
        v-model="form.quarter"
        placeholder="请选择条线组成员"
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
    <el-form-item label="主要内容" prop="sprintName">
      <el-input
        v-model="form.sprintName"
        placeholder="请输入主要内容"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="里程碑" prop="sprintName">
      <el-input
        v-model="form.sprintName"
        placeholder="请输入里程碑"
        type="textarea"
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
