// tests/components/PersonCard.test.js
import { render } from '@testing-library/vue'
import PersonCard from '@/components/PersonCard.vue'
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useWantedStore } from '@/stores/wantedStore'
import apiClient from '@/services/apiClient'

describe('PersonCard.vue', () => {
  it('renders person name and reward', () => {
    const person = {
      id: 'abc123',
      title: 'John Doe',
      reward_text: '$10,000 reward',
    }

    const { getByText } = render(PersonCard, {
      props: { person },
    })

    expect(getByText('John Doe')).toBeInTheDocument()
    expect(getByText('$10,000 reward')).toBeInTheDocument()
  })
})
