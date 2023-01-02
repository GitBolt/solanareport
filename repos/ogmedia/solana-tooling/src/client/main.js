import { createApp } from "vue";
import store from "./store";

import App from "./App.vue";
import "./mystyles.scss";

const NS = createApp(App);
NS.use(store);
NS.mount("#app");