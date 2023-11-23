<template>
  <div>
    <header>
      <nav class="container mx-auto py-6 flex justify-between items-center">
        <NuxtLink to="/" class="font-bold text-4xl">ThAmCo - Products</NuxtLink>

        <div class="flex border-2 border-gray-400 rounded">
          <input
            type="search"
            class="px-4 py-2 w-80"
            placeholder="Search for a product..."
          />
          <button class="flex items-center justify-center px-4 border-l">
            <svg
              class="w-5 h-5 text-gray-600"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M15.172 15.172a4 4 0 100-8 4 4 0 000 8zM18 18l3 3"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
    <div class="mx-auto p-4">
      <slot />
    </div>
  </div>
</template>
