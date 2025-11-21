import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/reservas",
      name: "reservas",
      component: () => import("../views/Reservas.vue"),
    },
    {
      path: "/clientes",
      name: "clientes",
      component: () => import("../views/Clientes.vue"),
    },
    {
      path: "/servicios",
      name: "servicios",
      component: () => import("../views/Servicios.vue"),
    },
  ],
});

export default router;
