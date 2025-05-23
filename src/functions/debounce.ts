export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: T): void => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
