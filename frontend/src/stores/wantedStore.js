import { defineStore } from 'pinia';
import apiClient from '@/services/apiClient';

export const useWantedStore = defineStore('wanted', {
  state: () => ({
    results: [],
    total: 0,
    page: 1,
    filters: {
      sex: '',
      race: '',
      field_offices: '',
      status: '',
      reward_min: '',
      reward_max: '',
    },
    personDetail: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchWantedList() {
      this.loading = true;
      this.error = null;

      try {
        const params = { page: this.page, ...this.filters };
        // remove empty values
        Object.keys(params).forEach((key) => {
          if (params[key] === '' || params[key] === null) delete params[key];
        });

        const res = await apiClient.get(`/wanted`, { params });
        this.results = res.data?.data?.results || [];
        this.total = res.data?.data?.total || 0;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchPersonById(id) {
      try {
        const res = await apiClient.get(`/wanted/${id}`);
        this.personDetail = res.data.data;
      } catch (err) {
        console.error('Error fetching person by ID:', err);
        return null;
      }
    },
    setPage(page) {
      this.page = page;
      this.fetchWantedList();
    },

    setFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.page = 1;
      this.fetchWantedList();
    },

    resetFilters() {
      this.filters = {
        sex: '',
        race: '',
        field_offices: '',
        status: '',
        reward_min: '',
        reward_max: '',
      };
      this.page = 1;
      this.fetchWantedList();
    },
  },
});
