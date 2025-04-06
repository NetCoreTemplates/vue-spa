<template>
  <footer class="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">

    <nav class="pt-8 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
      <div class="pb-6">
        <RouterLink to="/about" class="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">About</RouterLink>
      </div>

      <div class="pb-6">
        <RouterLink to="/posts" class="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">Archive</RouterLink>
      </div>

      <div class="pb-6">
        <RouterLink to="/privacy" class="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">Privacy</RouterLink>
      </div>
    </nav>

    <div class="container mx-auto px-5">
      <div class="py-20 flex flex-col lg:flex-row items-center">
        <h3 class="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
          A ServiceStack Project
        </h3>
        <div class="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
          <a href="https://docs.servicestack.net"
             class="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0">
            Read Documentation
          </a>
          <a href="https://github.com/NetCoreTemplates/vue-spa"
             class="mx-3 font-bold hover:underline">
            View on GitHub
          </a>
        </div>
      </div>
    </div>
    
  </footer>
</template>
<script setup lang="ts">
</script>