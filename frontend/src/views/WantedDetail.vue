<template>
  <section class="min-h-screen bg-primary text-white px-4 py-10">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="mb-8 flex items-center space-x-4">
        <router-link to="/" class="text-accent hover:underline text-sm">← Back to list</router-link>
        <h1 class="text-3xl font-bold">{{ person?.title }}</h1>
      </div>

      <!-- Main Grid -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Left: Image + Basic Info -->
        <div>
          <img :src="mainImage" :alt="person?.title"
            class="w-full h-80 object-cover rounded-xl border border-gray-700 grayscale" />
          <div class="mt-4 space-y-2 text-sm text-gray-300">
            <div><strong>Sex:</strong> {{ person?.sex || 'N/A' }}</div>
            <div><strong>Race:</strong> {{ person?.race || 'N/A' }}</div>
            <div><strong>Eyes:</strong> {{ person?.eyes || 'N/A' }}</div>
            <div><strong>Hair:</strong> {{ person?.hair || 'N/A' }}</div>
            <div><strong>Height:</strong> {{ person?.height || 'N/A' }}</div>
            <div><strong>Weight:</strong> {{ person?.weight || 'N/A' }}</div>
            <div><strong>Nationality:</strong> {{ person?.nationality || 'N/A' }}</div>
            <div><strong>Status:</strong> {{ person?.status || 'N/A' }}</div>
          </div>
        </div>

        <!-- Right: Details -->
        <div class="space-y-4">
          <p class="text-lg text-gray-300">{{ person?.description }}</p>

          <div v-if="person?.aliases?.length">
            <h3 class="text-lg font-semibold text-white mt-4">Known Aliases:</h3>
            <ul class="list-disc list-inside text-sm text-gray-400">
              <li v-for="alias in person.aliases" :key="alias">{{ alias }}</li>
            </ul>
          </div>

          <div v-if="person?.caution">
            <h3 class="text-lg font-semibold text-red-400">Caution:</h3>
            <p class="text-sm text-gray-200">{{ person.caution }}</p>
          </div>

          <div v-if="person?.warning">
            <h3 class="text-lg font-semibold text-yellow-500">Warning Message:</h3>
            <p class="text-sm text-gray-200">{{ person.warning }}</p>
          </div>

          <div v-if="person?.reward">
            <div class="mt-6 p-4 rounded-lg bg-red-900 text-red-200 border border-red-500">
              <strong>Reward:</strong> {{ person.reward }}
            </div>
          </div>

          <div v-if="person?.fieldOffices?.length">
            <h3 class="text-lg font-semibold mt-4">Contact Field Offices:</h3>
            <ul class="text-sm text-gray-300 list-disc list-inside">
              <li v-for="office in person.fieldOffices" :key="office">{{ office }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer: Published -->
      <div class="mt-10 text-xs text-gray-500">
        Published: {{ formattedDate }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useWantedStore } from '@/stores/wantedStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useWantedStore();

const { personDetail: person } = storeToRefs(store);

onMounted(async () => {
  const id = route.params.id;
  await store.fetchPersonById(id);
});

const mainImage = computed(() =>
  person.value?.image || 'https://via.placeholder.com/400x300?text=No+Image'
);

const formattedDate = computed(() => {
  if (!person.value?.publication) return 'N/A';
  return new Date(person.value.publication).toLocaleDateString();
});
</script>
