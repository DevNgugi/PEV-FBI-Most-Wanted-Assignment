<template>
  <div class="bg-primary text-white p-4 rounded-2xl shadow-md space-y-4">
    <h2 class="text-xl font-bold border-b border-gray-700 pb-2">Filter Wanted List</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label class="block mb-1 text-sm">Sex</label>
        <select v-model="filters.sex" class="w-full rounded-md bg-gray-800 text-white border border-gray-600 p-2">
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label class="block mb-1 text-sm">Race</label>
        <select v-model="filters.race" class="w-full rounded-md bg-gray-800 text-white border border-gray-600 p-2">
          <option value="">All</option>
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="hispanic">Hispanic</option>
        </select>
      </div>

      <div>
        <label class="block mb-1 text-sm">Field Office</label>
        <input
          v-model="filters.field_offices"
          type="text"
          placeholder="e.g. newyork"
          class="w-full rounded-md bg-gray-800 text-white border border-gray-600 p-2"
        />
      </div>

      <div>
        <label class="block mb-1 text-sm">Status</label>
        <select v-model="filters.status" class="w-full rounded-md bg-gray-800 text-white border border-gray-600 p-2">
          <option value="">All</option>
          <option value="captured">Captured</option>
          <option value="na">Not Available</option>
          <option value="located">Located</option>
        </select>
      </div>

      <div>
        <label class="block mb-1 text-sm">Reward Min</label>
        <input
          v-model="filters.reward_min"
          type="number"
          class="w-full rounded-md bg-gray-800 text-white border border-gray-600 p-2"
        />
      </div>

      <div>
        <label class="block mb-1 text-sm">Reward Max</label>
        <input
          v-model="filters.reward_max"
          type="number"
          class="w-full rounded-md bg-gray-800 text-white border border-gray-600 p-2"
        />
      </div>
    </div>

    <div class="flex justify-end gap-4 mt-4">
      <button
        @click="onReset"
        class="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition text-sm"
      >
        Reset
      </button>
      <button
        @click="onSearch"
        class="px-4 py-2 rounded-md bg-accent hover:bg-red-700 text-white transition text-sm"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['search']);

const filters = reactive({
  sex: '',
  race: '',
  field_offices: '',
  status: '',
  reward_min: '',
  reward_max: '',
});

function onSearch() {
  emit('search', { ...filters });
}

function onReset() {
  Object.keys(filters).forEach((key) => (filters[key] = ''));
  emit('search', { ...filters });
}
</script>
