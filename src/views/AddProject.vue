<template>
  <form @submit.prevent="submitForm">
    <div>
      <label>Title</label>
      <input type="text" required v-model="title" />
    </div>
    <div>
      <label>Details</label>
      <textarea required v-model="details" />
    </div>
    <button>Create</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      details: "",
    };
  },
  methods: {
    submitForm() {
      let newProject = {
        title: this.title,
        details: this.details,
        complete: false,
      };
      fetch("http://localhost:8000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      })
        .then(() => {
          this.$router.push("/"); // redirection
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>

<style></style>
