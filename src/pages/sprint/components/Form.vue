<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-width="100px">
    <el-form-item label="冲刺名" prop="sprintName">
      <el-input v-model="form.sprintName" placeholder="请输入冲刺名" />
    </el-form-item>
    <el-form-item label="起止时间" prop="date">
      <el-date-picker
        v-model="form.date"
        type="daterange"
        range-separator="To"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
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
