/**
 * @param {function} fun - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {function} - The debounced function
 */
export default function debounce(fun, delay) {
  // this timeout is closed into the returned function.
  // it acts as a way for subsequent calls to cancel
  // the previous call AND set up a timeout for the new call.
  let timeout = null;

  // note: need to use ...args for variadic behavior to work.
  return (...args) => {
    // clearTimeout works even if timeout is null
    clearTimeout(timeout);

    // using apply to preserve "this"
    timeout = setTimeout(() => fun.apply(this, args), delay);
  };
}
