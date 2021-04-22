<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div
        class="handle-button"
        :style="{ top: buttonTop + 'px', 'background-color': '#4ab7bd' }"
        @click="show = !show"
      >
        <i :class="show ? 'el-icon-close' : 'el-icon-set-up'" />
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onBeforeUnmount } from "vue";
import { addClass, removeClass } from "@/utils";
export default defineComponent({
  name: "RightPanel",
  props: {
    clickNotClose: {
      default: false,
      type: Boolean,
    },
    buttonTop: {
      default: 81,
      type: Number,
    },
  },
  setup(prop, context) {
    let show = ref(false);
    const rightPanel = ref(null);
    watch(show, (value, o) => {
      if (value && !prop.clickNotClose) {
        addEventClick(show);
      }
      if (value) {
        addClass(document.body, "showRightPanel");
      } else {
        removeClass(document.body, "showRightPanel");
      }
    });
    onMounted(() => {
      insertToBody(rightPanel.value);
    });
    onBeforeUnmount(() => {
      const elx = rightPanel.value;
      elx.remove();
    });
    return {
      show,
      rightPanel,
    };
  },
});
function addEventClick(show) {
  window.addEventListener("click", (evt) => {
    closeSidebar(evt, show);
  });
}
function closeSidebar(evt, show) {
  const parent = evt.target.closest(".rightPanel");
  if (!parent) {
    show = false;
    window.removeEventListener("click", (revt) => {
      closeSidebar(revt, show);
    });
  }
}
function insertToBody(rightPanel) {
  const elx = rightPanel;
  const body = document.querySelector("body");
  body.insertBefore(elx, body.firstChild);
}
</script>
<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>


<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 1000;
  background-color: #f0f2f5;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 999;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>