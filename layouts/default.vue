<template>
  <div>
    <header class='shadow-sm bg-white'>
      <nav class='container mx-auto p-6 flex justify-between text-xl'>
        <NuxtLink to='/' class='font-bold'>Nuxt Dojo</NuxtLink>
        <ul class='flex gap-4'>
          <li><NuxtLink to='/'>Home</NuxtLink></li>
          <li><NuxtLink to='/about'>About</NuxtLink></li>
          <li><NuxtLink to='/products' class='bg-[#00558F] text-white px-3 py-2 rounded-md text-xl'>Merch</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div class='container mx-auto p-4'>
      <slot />
    </div>
  </div>
</template>