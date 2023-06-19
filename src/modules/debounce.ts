/**
 * @param {function} fun - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {function} - The debounced function
 */
export default function debounce(fun: Function, delay: number): Function {
  // this timeout is closed into the returned function.
  // it acts as a way for subsequent calls to cancel
  // the previous call AND set up a timeout for the new call.
  let timeout: ReturnType<typeof setTimeout>;

  // note: need to use ...args for variadic behavior to work.
  return (...args: any) => {
    // clearTimeout works even if timeout is null
    clearTimeout(timeout);

    // using apply to preserve "this"
    // @ts-ignore
    timeout = setTimeout(() => fun.apply(this, args), delay);
  };
}
