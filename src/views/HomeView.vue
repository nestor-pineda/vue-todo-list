<template>
  <div class="home">
    <h1>home</h1>
    <FilterNav @filterChange="current = $event" :current="current" />
    <div v-if="projects.length">
      <div v-for="item in filteredItems" :key="item.id">
        <SingleProject :project="item" @deleteItem="handleDelete" @completeItem="handleComplete" />
      </div>
    </div>
    <div v-else>
      <p>Loading projects...</p>
    </div>
    <p>{{ current }}</p>
  </div>
</template>

<script>
import SingleProject from "../components/SingleProject.vue";
import FilterNav from "../components/FilterNav.vue";

export default {
  name: "HomeView",
  components: { SingleProject, FilterNav },
  data() {
    return {
      projects: [], // here we store the fetched data
      current: "all",
    };
  },
  mounted() {
    fetch("http://localhost:8000/projects")
      .then((res) => res.json())
      .then((data) => (this.projects = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    handleDelete(id) {
      let itemIndex = this.projects.indexOf(this.projects.id);
      this.projects.splice(itemIndex, 1);

      //WITH FILTER
      // this.projects = this.projects.filter((project) => {
      //   return project.id !== id;
      // });
    },
    handleComplete(id) {
      let project = this.projects.find((item) => {
        return item.id === id;
      });
      project.complete = !project.complete;
    },
  },
  computed: {
    filteredItems() {
      if (this.current === "ongoing") {
        return this.projects.filter((item) => !item.complete);
      } else if (this.current === "completed") {
        return this.projects.filter((item) => item.complete);
      } else {
        return this.projects;
      }
    },
  },
};
</script>

<style>
.home {
  max-width: 600px;
  margin: 0 auto;
}
</style>
