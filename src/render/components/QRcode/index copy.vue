<template>
  <el-dialog v-model="info.dialogVisible">
    <vueQR :text="info.text" logoSrc="./assets/logo.png" :size="200"></vueQR>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import vueQR from "vue-qr";

export default defineComponent({
  name: "vueqr",
  components: {
    vueQR,
  },
  setup(props, context) {
    const info = reactive({
      dialogVisible: false,
      text: "",
    });
    return {
      info,
      show: (text) => {
        info.dialogVisible = true;
        info.text = text;
      },
    };
  },
});
</script>
<style scoped>
</style>
