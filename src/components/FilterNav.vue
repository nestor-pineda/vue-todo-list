<template>
  <nav class="filter-nav">
    <!-- <button @click="updateFilter('all')" :class="{ active: current === 'all' }">All</button>
    <button @click="updateFilter('completed')" :class="{ active: current === 'completed' }">Completed</button>
    <button @click="updateFilter('ongoing')" :class="{ active: current === 'ongoing' }">Ongoing</button> -->
    <button @click="updateFilter('all')">All</button>
    <button @click="updateFilter('completed')">Completed</button>
    <button @click="updateFilter('ongoing')">Ongoing</button>
  </nav>
</template>

<script>
export default {
  propr: ["current"],
  methods: {
    updateFilter(state) {
      this.$emit("filterChange", state);
    },
  },
};
</script>

<style>
.filter-nav.active {
  color: red;
}
</style>
