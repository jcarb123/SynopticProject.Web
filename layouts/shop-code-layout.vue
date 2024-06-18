<template>
  <div class="bg-brand-primary-blue min-h-screen flex flex-col items-center justify-center">
    <header class="w-full text-center py-4 bg-white shadow-md">
      <img src="@/assets/images/logo.png" alt="Shop Code Logo" class="mx-auto w-56 h-auto">
    </header>
    <slot />
  </div>
</template>

<script>
export default {
  name: "shop-code-layout",
};
</script>
