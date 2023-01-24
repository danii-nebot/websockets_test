<template>
  <div>
    <ChatLog :chat-log="chatLog" />

    <input v-model="text" @keyup.enter="send" class="border border-gray-100" />
    <button @click="send">SEND</button>
  </div>
</template>

<script setup>
// const { $socket } = useNuxtApp();
import io from "socket.io-client";
import ChatLog from "./components/ChatLog.vue";
const config = useRuntimeConfig();

const chatLog = ref("");
const text = ref("");
let socket;

function addToChat(m) {
  chatLog.value += `<div>${m}</div>`;
}

function send() {
  socket.emit("message", text.value);
  addToChat(text.value); // optimistic UI
  text.value = "";
}
onMounted(() => {
  socket = io(config.public.wssUrl); // "http://192.168.20.31:3000");

  socket.on("message", (data) => {
    console.log(data, "<<<<");
    addToChat(data.message);
  });
});
</script>
