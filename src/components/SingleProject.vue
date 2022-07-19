<template>
  <div class="box" :class="{ green: project.complete }">
    <div class="box-title">
      <h3 @click="seeDetails = !seeDetails">{{ project.title }}</h3>
      <div class="icons">
        <router-link :to="{ name: 'editProject', params: { id: project.id } }"> <span class="material-symbols-outlined"> edit </span></router-link>

        <span @click="deleteProject" class="material-symbols-outlined"> delete </span>
        <span @click="toggleComplete" class="material-symbols-outlined" :class="{ greenIcon: project.complete }"> done </span>
      </div>
    </div>
    <p v-if="seeDetails">{{ project.details }}</p>
  </div>
</template>

<script>
export default {
  props: ["project"],
  data() {
    return {
      seeDetails: false,
      uri: "http://localhost:8000/projects/" + this.project.id,
    };
  },
  methods: {
    toogleDetails() {
      this.seeDetails = !this.seeDetails;
    },
    deleteProject() {
      fetch(this.uri, { method: "DELETE" })
        .then(() => this.$emit("deleteItem", this.project.id))
        .catch((err) => console.log(err.message));
    },
    toggleComplete() {
      fetch(this.uri, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }, // specifies the content type
        body: JSON.stringify({ complete: !this.project.complete }), // we stringify the object and turn it into a JSON string. We send the data that we are changing ("complete") and we send the revers of whatever the atual value is for "complete". This ony changes the JSON DB.
      })
        .then(() => this.$emit("completeItem", this.project.id)) // We wmit to change the parent component array.
        .catch((err) => console.log(err.message));
    },
  },
};
</script>

<style>
.box {
  width: 100%;
  background-color: white;
  padding: 15px 15px;
  border-left: 2px solid red;
  margin-bottom: 20px;
}
.box-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box.green {
  border-left: 2px solid green;
}
.greenIcon {
  color: green;
}
</style>
