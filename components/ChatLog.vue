<template>
  <div
    ref="chatBox"
    class="m-4 p-2 overflow-scroll border border-black-100 max-h-20 h-20 min-h-20 max-w-20"
  >
    <div v-for="(message, i) in chatLog" :key="i">
      <ChatMessage v-if="message.type === 'message'" class="max-w-xs">
        {{ message.content }}
      </ChatMessage>
      <ActivityMessage v-if="message.type === 'activity'">
        {{ message.content }}
      </ActivityMessage>
    </div>
  </div>
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

watch(
  chatLog,
  () => {
    nextTick(() => {
      y.value = chatBox.value.scrollHeight;
    });
  },
  { deep: true }
);
</script>
