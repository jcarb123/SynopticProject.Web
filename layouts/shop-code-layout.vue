<template>
  <div class="bg-brand-primary-blue min-h-screen flex flex-col items-center">
    <header class="w-full text-center py-4 bg-white shadow-md sticky top-0">
      <img
        src="@/assets/images/logo.png"
        alt="Shop Code Logo"
        class="mx-auto w-40 sm:w-48 md:w-56 lg:w-64 h-auto"
      />
    </header>
    <slot />
  </div>
</template>

<script>
export default {
  name: "shop-code-layout",
};
</script>
