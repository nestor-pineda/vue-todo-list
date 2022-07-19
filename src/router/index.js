import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddProject from "../views/AddProject.vue";
import EditProject from "../views/EditProject.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/create",
    name: "create",
    component: AddProject,
  },
  {
    path: "/edit-project/:id",
    name: "editProject",
    component: EditProject,
    props: true, // allow us to acces to the url parameter in EditProject.vue
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
