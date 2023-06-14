<template>
  <div class="dialog-area" :class="center && 'center'">
    <el-dialog
      v-model="visible"
      :title="title"
      :width="dialogWidth"
      :before-close="beforeChangeVisible"
      :fullscreen="fullscreen"
      destroy-on-close
      :close-on-click-modal="closeOnClickModal"
    >
      <!-- <img
        src="../../assets/images/dialog/enlarge.png"
        class="enlarge"
        @click="enlargeDialog"
      /> -->
      <slot name="content"></slot>
      <template #footer v-if="!withOutFooter">
        <span class="dialog-footer">
          <el-button @click="changeVisible">{{
            visibleText ? visibleText : "取消"
          }}</el-button>
          <el-button :loading="loading" type="primary" @click="onSubmit">{{
            submitText
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  nextTick,
  onMounted,
} from "vue";

export default defineComponent({
  props: {
    withOutFooter: {
      //footer绑定值
      type: Boolean,
      default: false,
    },
    loading: {
      //loading
      type: Boolean,
      default: false,
    },
    dialogVisible: {
      //dialog绑定值
      type: Boolean,
      require: true,
    },
    title: {
      //dialog标题
      type: String,
      require: true,
    },
    dialogWidth: {
      //dialog宽度，可以是百分数也可以是px
      type: String,
      default: "50%",
    },
    dialogHeight: {
      //dialog高度，可以是百分数也可以是px
      type: String,
      default: "60%",
    },
    center: {
      //dialog定位  传true dialog会垂直居中屏幕  如果弹窗里还套弹窗禁止使用这个属性！！！
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      // 是否可以通过点击 modal 关闭 Dialog
      type: Boolean,
      default: true,
    },
    submitText: {
      //dialog确认按钮上的文字
      type: String,
      default: "确认",
    },
    submitPower: {
      type: String,
      default: "",
    },
    visibleText: {
      //dialog取消按钮上的文字
      type: String,
    },
  },
  emits: ["changeVisible", "onSubmit", "changeVisibleText"], //changeVisible修改dialogVisible，onSubmit完成提交以后的动作
  setup(props, ctx) {
    const state = reactive({
      visible: props.dialogVisible,
      fullscreen: false,
      dHeight: "100%",
    });
    const changeVisible = () => {
      ctx.emit("changeVisible");
    };
    const beforeChangeVisible = () => {
      if (props.visibleText && props.visibleText !== "取消") {
        ctx.emit("changeVisibleText");
      } else {
        ctx.emit("changeVisible");
      }
    };
    const onSubmit = () => {
      ctx.emit("onSubmit");
    };
    const enlargeDialog = () => {
      state.fullscreen = !state.fullscreen;
      changeDialog();
    };
    watch(
      () => props.dialogVisible,
      () => {
        state.visible = props.dialogVisible;
        if (props.dialogVisible) {
          state.fullscreen = false;
          changeDialog();
        }
      }
    );
    // onMounted(() => {
    //   console.log(props.submitPower);
    // });
    const changeDialog = async () => {
      //保证dom节点刷新以后获取原生dom结构
      await nextTick();
      if (state.fullscreen) {
        state.dHeight = "100%";
      } else {
        state.dHeight = props.dialogHeight;
      }
    };
    return {
      ...toRefs(state),
      changeVisible,
      beforeChangeVisible,
      onSubmit,
      enlargeDialog,
    };
  },
});
</script>

<style lang="scss" scoped>
.dialog-area {
  .el-dialog {
    height: v-bind(dHeight);
    background: #ffffff;
    box-shadow: 8px 8px 40px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 0;

    .el-dialog__header {
      border-bottom: 1px solid #eeeeee;
      padding-top: 16px;
      padding-bottom: 16px;

      .el-dialog__title {
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        line-height: 22px;
      }
    }

    .el-dialog__body {
      flex: 1;
      padding-top: 13px;
      padding-bottom: 4px;
      overflow: hidden;
      overflow: auto;

      .enlarge {
        position: absolute;
        top: 1.5em;
        right: 3.5em;
        cursor: pointer;
        width: 1em;
      }
    }

    .dialog-footer {
      .el-button {
        width: 97px;
        height: 25px;
        border-radius: 7px;
      }
    }
  }
}
</style>