<template>
  <form @submit.prevent="handleEditSubmit">
    <div>
      <label>Title</label>
      <input type="text" required v-model="title" />
    </div>
    <div>
      <label>Details</label>
      <textarea required v-model="details" />
    </div>
    <button>Update Project</button>
  </form>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      title: "",
      details: "",
      uri: "http://localhost:8000/projects/" + this.id,
    };
  },
  mounted() {
    fetch(this.uri)
      .then((res) => res.json())
      .then((data) => {
        // asigning value toe the data() to populate the input fields using the v-model data binding.
        this.title = data.title;
        this.details = data.details;
      });
  },
  methods: {
    handleEditSubmit() {
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title: this.title, details: this.details }),
      })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err.message));
    },
  },
};
</script>

<style></style>
