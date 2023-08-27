export const debounce = <T extends string[]>(
  f: (...args: T) => void,
  delay: number,
) => {
  let timerId: number;

  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args)
  }
}