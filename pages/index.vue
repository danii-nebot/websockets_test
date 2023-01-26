<template>
  <div>
    hello, {{ user?.email }}
    <NuxtLink to="/secret">Go to private area</NuxtLink>
    <br />
    <ChatLog :chat-log="chatLog" />

    <input v-model="text" @keyup.enter="send" class="border border-gray-100" />
    <button @click="send">SEND</button>

    <div class="m-4 p-2">
      <button @click="onRegister" class="border border-gray-100 rounded-lg">
        SIGN IN/REGISTER
      </button>
      <br /><br />
      <button @click="onLogin" class="border border-gray-100 rounded-lg mt-4">
        LOG IN
      </button>
      <br /><br />
      <button
        @click="onGoogleLogin"
        class="border border-gray-100 rounded-lg mt-4"
      >
        GOOGLE LOG IN
      </button>
      <br /><br />
      <button @click="onLogout" class="border border-gray-100 rounded-lg mt-4">
        LOG OUT
      </button>
    </div>
  </div>
</template>

<script setup>
import io from "socket.io-client";
const config = useRuntimeConfig();
const chatLog = ref([]);
const text = ref("");
let socket;

const { user, loginUser, logout, googleLogin } = useFirebase();

function onGoogleLogin() {
  googleLogin();
}

function onLogin() {
  const email = "daniign@gmail.com";
  const password = "123456";
  loginUser(email, password);
}

function onLogout() {
  logout();
}

function addToChat(content, type = "message") {
  // TODO: process content
  switch (type) {
  }

  chatLog.value.push({
    content,
    type,
  });
}

function send() {
  socket.emit("message", text.value);
  addToChat(text.value); // optimistic UI
  text.value = "";
}
onMounted(() => {
  socket = io(config.public.wssUrl); // "http://192.168.20.31:3000");

  addToChat("welcome to the chat!", "activity");
  socket.on("message", (data) => {
    // console.log(data, "<<<<");
    addToChat(data.message);
  });

  socket.on("join", (data) => {
    // console.log(data, "<<<<");
    addToChat(data.message, "activity");
  });
});

// graceful teardown
onUnmounted(() => {
  socket.disconnect(true);
});
</script>
