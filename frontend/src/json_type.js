export function parseType(type, value) {
  return value
    .replace(type, "")
    .split(/(?=[A-Z])/)
    .join(" ");
}

export function serializeType(type, value) {
  return { _type: value.replace(" ", "") + type };
}
