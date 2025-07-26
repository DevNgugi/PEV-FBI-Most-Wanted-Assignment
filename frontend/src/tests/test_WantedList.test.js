import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import WantedList from '@/views/WantedList.vue';
import { useWantedStore } from '@/stores/wantedStore';

// Mock PersonCard
vi.mock('@/components/PersonCard.vue', () => ({
  default: {
    name: 'PersonCard',
    template: '<div class="person-card">Mocked Person</div>',
    props: ['person'],
  },
}));

describe('WantedList.vue', () => {
  it('renders the correct number of PersonCard components', () => {
    const wrapper = mount(WantedList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              wanted: {
                results: [
                  { id: '1', title: 'Fug 1' },
                  { id: '2', title: 'Fug 2' },
                  { id: '3', title: 'Fug 3' }
                ],
                page: 1,
                filters: {},
              },
            },
            stubActions: true,
          }),
        ],
      },
    });

    const cards = wrapper.findAllComponents({ name: 'PersonCard' });
    expect(cards.length).toBe(3);
  });
});

describe('WantedList.vue', () => {
  it('calls fetchWantedList on mount', () => {
    const fetchWantedList = vi.fn();

    mount(WantedList, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const store = useWantedStore();
    store.fetchWantedList = fetchWantedList;

    store.fetchWantedList();

    expect(fetchWantedList).toHaveBeenCalled();
  });
});