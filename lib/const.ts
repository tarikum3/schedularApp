export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};
export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "name" | "createdAt" | "price";
  reverse: boolean;
};
export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};
export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Name",
    slug: "name",
    sortKey: "name",
    reverse: false,
  }, // asc
  {
    title: "Latest arrivals",
    slug: "createdAt",
    sortKey: "createdAt",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price",
    sortKey: "price",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "price",
    sortKey: "price",
    reverse: true,
  },
];

export const primaryColors: Record<string, string> = {
  "primary-900": "#111827",
  "primary-800": "#1F2937",
  "primary-700": "#374151",
  "primary-600": "#4B5563",
  "primary-500": "#6B7280",
  "primary-400": "#9CA3AF",
  "primary-300": "#D1D5DB",
  "primary-200": "#E5E7EB",
  "primary-100": "#FFFFFF",
};
