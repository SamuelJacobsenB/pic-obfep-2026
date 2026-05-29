export function signal(initialValue) {
  let value = initialValue;
  const listeners = new Set();

  return {
    get value() {
      return value;
    },

    set value(newValue) {
      if (newValue != value) {
        value = newValue;

        listeners.forEach((listener) => {
          listener(value);
        });
      }
    },

    subscribe(callback) {
      listeners.add(callback);

      return () => {
        listeners.delete(callback);
      };
    },
  };
}
