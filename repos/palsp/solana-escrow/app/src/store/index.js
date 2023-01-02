import { createStore } from "vuex";
import products from "./products";
import wallet from "./wallet";

export default createStore({
  modules: {
    products,
    wallet,
  },
});
