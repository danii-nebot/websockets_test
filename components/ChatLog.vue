<template>
  <div
    ref="chatBox"
    v-html="chatLog"
    class="overflow-scroll border border-black-100 max-h-20 h-20 min-h-20 max-w-20"
  ></div>
</template>
<script setup>
import { toRefs } from "vue";
import { useScroll } from "@vueuse/core";
const props = defineProps(["chatLog"]);
const { chatLog } = toRefs(props);
const chatBox = ref(null);
const { y } = useScroll(chatBox, {
  behavior: "smooth",
});

watch(chatLog, () => {
  nextTick(() => {
    y.value = chatBox.value.scrollHeight;
  });
});
</script>
