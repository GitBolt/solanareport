import { ref, watch } from "vue";

export const useDebounce = (term, delay) => {
  const debounceTerm = ref(term.value);
  const timeoutId = ref(null);

  watch(term, () => {
    if (timeoutId.value) clearTimeout(timeoutId.value);

    timeoutId.value = setTimeout(() => {
      debounceTerm.value = term.value;
    }, delay);
  });

  return [debounceTerm];
};
