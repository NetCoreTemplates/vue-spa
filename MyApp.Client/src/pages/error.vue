<template>
  <div class="mx-auto">
    <section class="text-center mt-16 mb-16 md:mb-12">
      <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-50 sm:text-5xl md:text-6xl">
        Error.
      </h1>
      <h2 class="mb-4 text-3xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8 whitespace-nowrap text-center pt-8 text-red-600">
        {{ $route.query.message ?? "An error occurred while processing your request." }}
      </h2>
    </section>
  </div>
</template>
