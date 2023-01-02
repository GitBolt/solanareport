import { ref, watch, computed } from "vue";

export const useFormInput = (
  input,
  validateFn,
  className = "",
  errorClassName = "error"
) => {
  const error = ref(false);

  watch(input, (newVal) => {
    if (!validateFn(newVal)) {
      error.value = true;
    } else {
      error.value = false;
    }
  });

  const inputClassName = computed(() => {
    const classes = [];
    if (className) classes.push(className);

    return error.value
      ? classes.concat([errorClassName]).join(" ")
      : classes.join(" ");
  });

  return [error, inputClassName];
};
