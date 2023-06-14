<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-width="120px">
    <div class="task_form">
      <div>
        <el-form-item label="任务名" prop="sprintName">
          <el-input v-model="form.sprintName" placeholder="请输入任务名" />
        </el-form-item>
        <el-form-item label="归属条线" prop="sprintName">
          <el-select
            v-model="form.quarter"
            placeholder="请选择归属条线"
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
        <el-form-item label="归属需求" prop="sprintName">
          <el-select
            v-model="form.quarter"
            placeholder="请选择归属需求"
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
        <el-form-item label="状态" prop="sprintName">
          <el-select v-model="form.quarter" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in quarterList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="冲刺" prop="sprintName">
          <el-select v-model="form.quarter" placeholder="请选择冲刺" clearable>
            <el-option
              v-for="item in quarterList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="DUE" prop="sprintName">
          <el-date-picker
            v-model="form.sprintName"
            type="date"
            placeholder="请选择DUE"
          />
        </el-form-item>
      </div>

      <div>
        <el-form-item label="工作量" prop="sprintName">
          <el-input v-model="form.sprintName" placeholder="请输入工作量"   style="width: 150px"/>
        </el-form-item>
        <el-form-item label="开发者" prop="sprintName">
          <el-select
            v-model="form.quarter"
            placeholder="请选择开发者"
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
        <el-form-item label="优先级" prop="sprintName">
          <el-select
            v-model="form.quarter"
            placeholder="请选择优先级"
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
        <el-form-item label="用户故事" prop="sprintName">
          <el-input
            v-model="form.sprintName"
            placeholder="请输入用户故事"
            type="textarea"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="任务详细描述" prop="sprintName">
          <el-input
            v-model="form.sprintName"
            placeholder="请输入任务详细描述"
            type="textarea"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="备注" prop="sprintName">
          <el-input
            v-model="form.sprintName"
            placeholder="条线负责人可以自由发挥
如：接口开发人员
数据开发人员
现有问题..."
            type="textarea"
            style="width: 300px"
          />
        </el-form-item>
      </div>
    </div>
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


<style lang="scss" scoped>
.task_form {
  display: flex;
}
</style>