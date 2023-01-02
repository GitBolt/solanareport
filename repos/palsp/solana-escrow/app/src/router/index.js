import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import store from "@/store";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/new",
    name: "NewProduct",
    component: require("@/pages/NewProduct.vue").default,
    meta: { requireConnected: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: require("@/pages/Profile.vue").default,
    meta: { requireConnected: true },
  },
  {
    path: "/product/:pubkey",
    name: "Product",
    component: require("@/pages/Product.vue").default,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const connected = store.getters["wallet/connected"];
  if (to.meta.requireConnected && !connected) {
    next("/");
    return;
  }

  next();
});

export default router;
