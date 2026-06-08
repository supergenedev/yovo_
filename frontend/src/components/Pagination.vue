<script setup>
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  currentPage: { default: 3 },
  label: { default: 'Pagination' },
  pages: { default: () => [1, 2, 3, 4, 'ellipsis', 10] },
  size: { default: 'md' },
  totalPages: { default: 10 },
})

const classes = computed(() =>
  ['sg-ds-library-scope', 'pagination', attrs.class].filter(Boolean).join(' ')
)

const lastPage = computed(() => Math.max(1, props.totalPages))
const activePage = computed(() => Math.min(Math.max(1, props.currentPage), lastPage.value))
const isFirstPage = computed(() => activePage.value <= 1)
const isLastPage = computed(() => activePage.value >= lastPage.value)
</script>

<template>
  <nav
    v-bind="{ ...$attrs, class: undefined }"
    :class="classes"
    :aria-label="props.label"
    :data-size="props.size"
  >
    <span
      v-if="isFirstPage"
      class="pagination-prev"
      aria-disabled="true"
      aria-label="Previous page"
    >
      <span aria-hidden="true">←</span>
      Previous
    </span>
    <a
      v-else
      class="pagination-prev"
      :href="`?page=${activePage - 1}`"
      aria-label="Previous page"
    >
      <span aria-hidden="true">←</span>
      Previous
    </a>

    <ul class="pagination-list">
      <slot>
        <li v-for="(page, index) in props.pages" :key="`${page}-${index}`">
          <span
            v-if="page === 'ellipsis'"
            aria-hidden="true"
            class="sg-ds-library-scope pagination-ellipsis"
          >…</span>
          <a
            v-else
            :aria-current="page === activePage ? 'page' : undefined"
            class="sg-ds-library-scope pagination-item"
            :href="`?page=${page}`"
          >{{ page }}</a>
        </li>
      </slot>
    </ul>

    <span
      v-if="isLastPage"
      class="pagination-next"
      aria-disabled="true"
      aria-label="Next page"
    >
      Next
      <span aria-hidden="true">→</span>
    </span>
    <a
      v-else
      class="pagination-next"
      :href="`?page=${activePage + 1}`"
      aria-label="Next page"
    >
      Next
      <span aria-hidden="true">→</span>
    </a>
  </nav>
</template>
