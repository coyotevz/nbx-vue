
export function paddingLeft(padding, value) {
  return String(padding + value).slice(-Math.max(padding.length, value.length));
}
