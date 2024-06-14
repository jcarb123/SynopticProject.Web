<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow bg-gray-100">
      <slot></slot>
    </main>
    <Footer class="mt-5" />
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/global/Header.vue";
import Footer from "~/components/global/Footer.vue";
</script>
