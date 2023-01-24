<template>
  <div>
    <p>Check socket status in Vue devtools...</p>
    <p>
      {{ message }}
    </p>
    <input v-model="text" />
    <button @click="send">SEND</button>
  </div>
</template>

<script setup>
// const { $socket } = useNuxtApp();
import io from "socket.io-client";

const message = ref("");
const text = ref("");
let socket;
function send() {
  console.log(text.value);
  socket.emit("message", text.value);
}
onMounted(() => {
  socket = io(config.public.wssUrl); // "http://192.168.20.31:3000");

  socket.on("message", (data) => {
    console.log(data, "<<<<");
    message.value = data;
  });
});
</script>
