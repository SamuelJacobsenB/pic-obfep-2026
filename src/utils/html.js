export function html(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] !== undefined ? values[i] : "";
    return result + string + value;
  }, "");
}
