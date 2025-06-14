export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const parseSlugPath = (slugPath: string): string[] => {
  return slugPath.split("/").filter(segment => segment.length > 0);
};
