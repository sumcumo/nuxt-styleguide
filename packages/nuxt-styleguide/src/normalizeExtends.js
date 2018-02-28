export default function normalizeExtends(e) {
  if (!e) {
    return [];
  }

  if (!Array.isArray(e)) {
    return [e];
  }

  return e;
}
