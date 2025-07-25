<template>
  <section class="min-h-screen bg-primary text-white px-4 py-10">
    <div class="max-w-6xl mx-auto flex flex-col h-[90vh] ">

      <!-- Fixed Header + Filter -->
      <div class="sticky top-0 z-10 bg-primary pb-4">
        <h1 class="text-3xl font-bold mb-4 flex items-center justify-center">
          <span
            class="w-10 h-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/59/Seal_of_the_FBI.svg')] bg-contain bg-no-repeat mr-3"
            role="img" aria-label="FBI Seal">
          </span>
          FBI Most Wanted
        </h1>
        <FilterPanel @update="applyFilters" />
      </div>

      <!-- Scrollable Content -->
      <div class="overflow-y-auto flex-1 mt-8 pr-1">
        <div class="grid md:grid-cols-3 gap-6">
          <PersonCard v-for="person in results" :key="person.id" :person="person" />
        </div>

        <div class="mt-8">
          <Pagination :total="total" :page="page" @change="fetchData" />
        </div>
      </div>

    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { fetchWantedList } from '@/services/api';
import PersonCard from '@/components/PersonCard.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import Pagination from '@/components/Pagination.vue';
import { useWantedStore } from '@/stores/wantedStore';


const store = useWantedStore();
console.log(store.fetchWantedList)
const results = ref([]);
const total = ref(0);
const page = ref(1);
const filters = ref({});

async function fetchData(p = 1) {
  const response = await fetchWantedList({ page: p, ...filters.value });
  results.value = response.data.results;
  total.value = response.data.total;
  page.value = p;
}

function applyFilters(newFilters) {
  filters.value = newFilters;
  fetchData(1);
}

onMounted(() => fetchData());
</script>
