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
