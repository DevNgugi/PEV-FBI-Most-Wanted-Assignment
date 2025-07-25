<template>
  <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600 transition">
    <!-- <img :src="person.images[0]?.thumb" class="w-full h-48 object-cover grayscale" /> -->
    <div class="p-4">
      <h2 class="text-xl font-semibold">{{ person.title }}</h2>
      <p class="text-sm text-gray-400 mt-1">{{ person.description }}</p>
      <router-link :to="`/person/${person.id}`" class="text-accent mt-4 block text-sm">View Details →</router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({ person: Object });
</script>
