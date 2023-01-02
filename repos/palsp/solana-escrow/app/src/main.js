import "@solana/wallet-adapter-vue-ui/styles.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ProductCard from "@/components/ProductCard.vue";
import BaseImage from "@/components/ui/BaseImage.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

import AccountSummary from "@/components/AccountSummary.vue";
import ProductAction from "@/components/ProductAction.vue";

const app = createApp(App);

app.component("ProductCard", ProductCard);
app.component("BaseImage", BaseImage);
app.component("BaseButton", BaseButton);

app.component("AccountSummary", AccountSummary);
app.component("ProductAction", ProductAction);

app.use(store);
app.use(router);

app.mount("#app");
