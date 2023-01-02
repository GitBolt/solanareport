import { getProducts, sellerFilter, buyerFilter, getProductByID } from "@/api";
import { stage } from "../models";
export default {
  namespaced: true,
  state: {
    products: [],
    myProducts: [],
    myPurchase: [],
    myInitiateProducts: [],

    myWaitingForShipmentProducts: [],

    myShippingProducts: [],

    myDeliveredProducts: [],

    myWaitingForShipmentPurchase: [],

    myShippingPurchase: [],

    myDeliveredPurchase: [],
  },

  getters: {
    products(state) {
      return state.products;
    },
    myProducts(state) {
      return state.myProducts;
    },
    myPurchase(state) {
      return state.myPurchase;
    },

    myInitiateProducts(state) {
      return state.myInitiateProducts;
    },

    myWaitingForShipmentProducts(state) {
      return state.myWaitingForShipmentProducts;
    },

    myShippingProducts(state) {
      return state.myShippingProducts;
    },

    myDeliveredProducts(state) {
      return state.myDeliveredProducts;
    },

    myWaitingForShipmentPurchase(state) {
      return state.myWaitingForShipmentPurchase;
    },
    myShippingPurchase(state) {
      return state.myShippingPurchase;
    },

    myDeliveredPurchase(state) {
      return state.myDeliveredPurchase;
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setMyProducts(state, myProducts) {
      state.myProducts = myProducts;
    },
    setMyPurchase(state, myPurchase) {
      state.myPurchase = myPurchase;
    },
    setFilterProducts(state, myProducts) {
      state.myInitiateProducts = myProducts[0];
      state.myWaitingForShipmentProducts = myProducts[1];
      state.myShippingProducts = myProducts[2];
      state.myDeliveredProducts = myProducts[3];
    },

    setFilterPurchase(state, myPurchase) {
      state.myWaitingForShipmentPurchase = myPurchase[0];
      state.myShippingPurchase = myPurchase[1];
      state.myDeliveredPurchase = myPurchase[2];
    },
    addProduct(state, product) {
      state.product.push(product);
      state.myProducts.push(product);
      state.myInitiateProducts.push(product);
    },
  },
  actions: {
    async getProducts({ commit }, workspace) {
      const products = await getProducts(workspace);
      commit("setProducts", products);
    },
    async getMyProducts({ commit }, workspace) {
      const myProducts = await getProducts(workspace, [
        sellerFilter(workspace.wallet.value.publicKey.toBase58()),
      ]);
      commit("setMyProducts", myProducts);
    },
    async addProduct({ commit }, { workspace, productPubkeyBase58 }) {
      const product = await getProductByID(workspace, productPubkeyBase58);
      commit("addProduct", product);
    },
    async getMyPurchase({ commit }, workspace) {
      const myPurchase = await getProducts(workspace, [
        buyerFilter(workspace.wallet.value.publicKey.toBase58()),
      ]);

      commit("setMyPurchase", myPurchase);
    },

    async filterProducts({ commit, state, dispatch }, workspace) {
      await dispatch("getMyProducts", workspace);
      await dispatch("getMyPurchase", workspace);

      const myProducts = [[], [], [], []];
      for (const product of state.myProducts) {
        switch (product.stage) {
          case stage.initiate:
            myProducts[0].push(product);
            break;
          case stage.waitForShipping:
            myProducts[1].push(product);
            break;
          case stage.shippingInProgress:
            myProducts[2].push(product);
            break;
          case stage.delivered:
            myProducts[3].push(product);
            break;
        }
      }
      const myPurchase = [[], [], []];
      for (const purchase of state.myPurchase) {
        switch (purchase.stage) {
          case stage.waitForShipping:
            myPurchase[0].push(purchase);
            break;
          case stage.shippingInProgress:
            myPurchase[1].push(purchase);
            break;
          case stage.delivered:
            myPurchase[2].push(purchase);
            break;
        }
      }
      commit("setFilterProducts", myProducts);
      commit("setFilterPurchase", myPurchase);
    },

    async refresh({ dispatch }, workspace) {
      await dispatch("getProducts", workspace);
      await dispatch("filterProducts", workspace);
    },
  },
};
