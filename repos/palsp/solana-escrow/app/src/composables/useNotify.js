import { inject, provide, ref, reactive, toRefs } from "vue";

const notifySymbol = Symbol("Notify");

export const useNotify = () => inject(notifySymbol);

export const initNotify = (timeout = 8000) => {
  const showNotification = ref(false);
  const timeoutId = ref(null);
  const status = reactive({
    isSuccess: false,
    txid: "",
    isError: false,
    errorMessage: "",
    title: "",
  });

  const info = (title = "Transaction has been sent") => {
    status.isSuccess = false;
    status.txid = "";
    status.isError = false;
    status.errorMessage = "";
    status.title = title;
    openAndAutoClose();
  };

  const success = (_txid, title = "Confirmation is in progress.") => {
    status.isSuccess = true;
    status.txid = _txid;
    status.isError = false;
    status.errorMessage = "";
    status.title = title;

    openAndAutoClose();
  };

  const error = (errorMessage, title = "Transaction failed") => {
    status.isSuccess = false;
    status.txid = "";
    status.isError = true;
    status.errorMessage = errorMessage;
    status.title = title;

    openAndAutoClose();
  };

  const openAndAutoClose = () => {
    showNotification.value = true;
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
    }

    timeoutId.value = setTimeout(() => {
      showNotification.value = false;
    }, timeout);
  };

  const close = () => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
    }

    showNotification.value = false;
  };

  provide(notifySymbol, {
    showNotification,
    ...toRefs(status),
    close,
    notify: {
      info,
      success,
      error,
    },
  });
};
