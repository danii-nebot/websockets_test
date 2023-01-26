<template>
  <div>Only for authenticated users hello, {{ user?.email }}</div>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"],
});

const { user } = useFirebase();
</script>
