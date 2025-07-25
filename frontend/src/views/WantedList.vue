<template>
  <section class="min-h-screen bg-primary text-white px-4 py-10">
    <div class="max-w-7xl mx-auto h-[90vh] flex flex-col md:flex-row gap-6">

      <!-- Mobile: Top Bar -->
      <div class="md:hidden flex justify-between items-center mb-4 px-2">
        <span
          class="w-10 h-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/59/Seal_of_the_FBI.svg')] bg-contain bg-no-repeat mr-3"
          role="img" aria-label="FBI Seal">
        </span>
        <h1 class="text-2xl font-bold">FBI Most Wanted</h1>
        <button @click="showSidebar = true" class="text-white">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Desktop Sidebar -->
      <aside class="hidden md:block w-1/4">
        <div class="mb-6 text-center">
          <h1 class="text-3xl font-bold flex items-center justify-center">
            <span
              class="w-10 h-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/59/Seal_of_the_FBI.svg')] bg-contain bg-no-repeat mr-3"
              role="img" aria-label="FBI Seal">
            </span>
            FBI Most Wanted
          </h1>
        </div>
        <FilterPanel @update="handleFilterUpdate" />
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <div class="overflow-y-auto flex-1 pr-1 mt-6 md:mt-0">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PersonCard v-for="person in results" :key="person.id" :person="person" />
          </div>
        </div>

        <div class="sticky bottom-0 bg-primary py-4">
          <Pagination :total="total" :page="page" @change="handlePageChange" />
        </div>
      </div>
    </div>

    <!-- Mobile Sidebar Drawer -->
    <transition name="slide">
      <div v-if="showSidebar" class="fixed inset-0 z-50 bg-black bg-opacity-70 flex">
        <div class="w-3/4 bg-gray-900 p-6 overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Filters</h2>
            <button @click="showSidebar = false" class="text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <FilterPanel @update="handleFilterUpdate" />
        </div>
        <div class="flex-1" @click="showSidebar = false"></div>
      </div>
    </transition>
  </section>
</template>



<script setup>
import { ref, watch, onMounted } from 'vue';
import PersonCard from '@/components/PersonCard.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import Pagination from '@/components/Pagination.vue';
import { useWantedStore } from '@/stores/wantedStore';
import { storeToRefs } from 'pinia';

const store = useWantedStore();

const { results, total, page, filters } = storeToRefs(store);

const showSidebar = ref(false);

onMounted(() => {
  store.fetchWantedList();
});

watch(page, () => {
  store.fetchWantedList();
});


// Watch filters change deeply
watch(filters, () => {
  store.fetchWantedList();
}, { deep: true });

// Triggered by FilterPanel emit
function handleFilterUpdate(newFilters) {
  store.setFilters(newFilters);
  store.setPage(1);
  showSidebar.value = false;
}

// Pagination
function handlePageChange(newPage) {
  store.setPage(newPage);
}
</script>

<style>
/* for mobile sidebar */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-from {
  transform: translateX(0%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>