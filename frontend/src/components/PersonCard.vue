<template>
  <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600 transition">
    <img
      :src="person.image || fallbackImage"
      :alt="person.title"
      class="w-full h-48 object-cover grayscale"
    />
    <div class="p-4">
      <h2 class="text-xl font-semibold">{{ person.title }}</h2>
      <p class="text-sm text-gray-400 mt-1">{{ person.description }}</p>
      <router-link :to="`/person/${person.id}`" class="text-accent mt-4 block text-sm">
        View Details →
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ person: Object });

const fallbackImage = 'https://via.placeholder.com/400x300?text=No+Image';
</script>
