<template>
    <div class="flex justify-center mt-6 space-x-2">
        <button :disabled="page <= 1" @click="$emit('change', page - 1)"
            class="px-3 py-1 rounded-lg border border-gray-600 text-white bg-gray-700 hover:bg-gray-600 disabled:opacity-50">
            Previous
        </button>

        <span class="text-white text-sm pt-1">Page {{ page }} of {{ total }}</span>

        <button :disabled="(page >= total)" @click="$emit('change', page + 1)"
            class="px-3 py-1 rounded-lg border border-gray-600 text-white bg-gray-700 hover:bg-gray-600 disabled:opacity-50">
            Next
        </button>
    </div>
</template>

<script setup>
defineProps({
    total: Number,
    page: Number
});

defineEmits(['change']);
</script>
