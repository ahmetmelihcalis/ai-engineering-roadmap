export function slugify(value: string) {
  return value
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
