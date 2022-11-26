export const createSlug = (slug: string) => {
  return slug
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
