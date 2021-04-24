<template>
  <el-dialog
    v-model="info.dialogVisible"
    @opened="createQRCode"
    :title="info.title"
    width="340px"
  >
    <div id="qrcode"></div>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { qrcanvas } from "qrcanvas";

export default defineComponent({
  name: "QRCode",
  setup(props, context) {
    const info = reactive({
      dialogVisible: false,
      text: "",
      title: "",
    });
    return {
      info,
      show: (text, title) => {
        info.dialogVisible = true;
        info.text = text;
        info.title = title;
      },
      createQRCode: () => {
        var canvas = qrcanvas({
          data: info.text,
          size: 300,
          correctLevel: "H",
        });
        document.querySelector("#qrcode").innerHTML = "";
        document.querySelector("#qrcode").appendChild(canvas);
      },
    };
  },
});
</script>
<style scoped>
#qrcode {
  width: 300px;
  height: 300px;
}
</style>
