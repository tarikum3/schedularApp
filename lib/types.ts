export interface Discount {
  /**
   * The value of the discount, can be an amount or percentage.
   */
  value: number;
}

export interface Measurement {
  /**
   * The measurement's value.
   */
  value: number;
  /**
   * The measurement's unit, such as "KILOGRAMS", "GRAMS", "POUNDS" & "OOUNCES".
   */
  unit: "KILOGRAMS" | "GRAMS" | "POUNDS" | "OUNCES";
}

export interface Image {
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * A word or phrase that describes the content of an image.
   */
  alt?: string;
  /**
   * The image's width.
   */
  width?: number;
  /**
   * The image's height.
   */
  height?: number;
}

export interface ProductPrice {
  /**
   * The price after all discounts are applied.
   */
  value: number;
  /**
   * The currency code for the price. This is a 3-letter ISO 4217 code.
   * @example USD
   */
  currencyCode?: "USD" | "EUR" | "ARS" | "GBP" | string;
  /**
   * The retail price of the product. This can be used to mark a product as on sale, when `retailPrice` is higher than the price a.k.a `value`.
   */
  retailPrice?: number;
}

export interface ProductOption {
  __typename?: "MultipleChoiceOption";
  /**
   * The unique identifier for the option.
   */
  id: string;
  /**
   * The product option’s name.
   * @example `Color` or `Size`
   */
  displayName: string;
  /**
   * List of option values.
   * @example `["Red", "Green", "Blue"]`
   */
  values: ProductOptionValues[];
}

export interface ProductOptionValues {
  /**
   * A string that uniquely identifies the option value.
   */
  label: string;
  /**
   * List of hex colors used to display the actual colors in the swatches instead of the name.
   */
  hexColors?: string[];
}

export interface ProductVariant {
  /**
   *  The unique identifier for the variant.
   */
  id: string;
  /**
   * The SKU (stock keeping unit) associated with the product variant.
   */
  sku?: string;
  /**
   * The product variant’s name, or the product's name.
   */
  name?: string;
  /**
   * List of product options.
   */
  // options: ProductOption[]
  options?: ProductOption[];
  /**
   * The product variant’s price after all discounts are applied.
   */
  price?: ProductPrice;
  /**
   * The retail price of the product. This can be used to mark a product as on sale, when `retailPrice` is higher than the `price`.
   */
  retailPrice?: ProductPrice;
  /**
   * Indicates if the variant is available for sale.
   */
  availableForSale?: boolean;
  /**
   * Whether a customer needs to provide a shipping address when placing an order for the product variant.
   */
  requiresShipping?: boolean;
  /**
   * The image associated with the variant.
   */
  image?: Image;
}

export interface Product {
  /**
   *  The unique identifier for the product.
   */
  id: string;
  /**
   * The name of the product.
   */
  name: string;
  /**
   * Stripped description of the product, single line.
   */
  description: string;
  /**
   * The description of the product, complete with HTML formatting.
   */
  descriptionHtml?: string;
  /**
   * The SKU (stock keeping unit) associated with the product.
   */
  sku?: string;
  /**
   * A human-friendly unique string for the product, automatically generated from its title.
   */
  slug?: string;
  /**
   * Relative URL on the storefront for the product.
   */
  path?: string;
  /**
   * List of images associated with the product.
   */
  images: Image[];
  /**
   * List of the product’s variants.
   */
  variants: ProductVariant[];
  /**
   * The product's base price. Could be the minimum value, or default variant price.
   */
  price: ProductPrice;
  /**
   * List of product's options.
   */
  options: ProductOption[];
  /**
   * The product’s vendor name.
   */
  vendor?: string;
}

export interface SearchProductsBody {
  /**
   * The search query string to filter the products by.
   */
  search?: string;
  /**
   * The category ID to filter the products by.
   */
  categoryId?: string;
  /**
   * The brand ID to filter the products by.
   */
  brandId?: string;
  /**
   * The sort key to sort the products by.
   * @example 'trending-desc' | 'latest-desc' | 'price-asc' | 'price-desc'
   */
  sort?: string;
  /**
   * The locale code, used to localize the product data (if the provider supports it).
   */
  locale?: string;
}

export interface Category {
  id: string;

  name: string;
  /**
   *  A human-friendly unique string for the category, automatically generated from its name.
   * @example "t-shirts"
   */
  slug: string;
  /**
   * Relative URL on the storefront for the category.
   * @example /t-shirts
   */
  path: string;
}

export interface Brand {
  id: string;

  name: string;
  /**
   *  A human-friendly unique string for the category, automatically generated from its name.
   * @example "acme"
   */
  slug: string;
  /**
   * Relative URL on the storefront for this brand.
   * @example "/acme"
   */
  path: string;
}

export interface SelectedOption {
  id?: string;
  /**
   *  The product option’s name, such as "Color" or "Size".
   */
  name: string;
  /**
   * The product option’s value, such as "Red" or "XL".
   */
  value: string;
}

export interface LineItem {
  /**
   * The unique identifier for the line item.
   */
  id: string;
  /**
   * The unique identifier for the product variant.
   */
  variantId: string;
  /**
   * The unique identifier for the product, if the variant is not provided.
   */
  productId: string;
  /**
   * This is usually the product's name.
   */
  name: string;
  /**
   * The quantity of the product variant in the line item.
   */
  quantity: number;
  /**
   * List of discounts applied to the line item.
   */
  discounts: Discount[];
  /**
   * A human-friendly unique string automatically generated from the product’s name.
   */
  path: string;
  /**
   * The product variant.
   */
  variant: ProductVariant;
  /**
   * List of selected options, to be used when displaying the line item, such as Color: Red, Size: XL.
   */
  options?: SelectedOption[];
}

/**
 * Shopping cart, a.k.a Checkout
 */
export interface Cart {
  /**
   * The unique identifier for the cart.
   */
  id: string;
  /**
   * ID of the customer to which the cart belongs.
   */
  customerId?: string;
  /**
   * The URL of the cart.
   */
  url?: string;
  /**
   * The email assigned to this cart.
   */
  email?: string;
  /**
   *  The date and time when the cart was created.
   */
  createdAt: string;
  /**
   * The currency used for this cart */
  currency: { code: string };
  /**
   * Indicates if taxes are included in the line items.
   */
  taxesIncluded: boolean;
  /**
   * List of cart line items.
   */
  lineItems: LineItem[];
  /**
   * The sum of all the pricexs of all the items in the cart.
   * Duties, taxes, shipping and discounts excluded.
   */
  lineItemsSubtotalPrice: number;
  /**
   * Price of the cart before duties, shipping and taxes.*/
  subtotalPrice: number;
  /**
   * The sum of all the prices of all the items in the cart.
   * Duties, taxes and discounts included.
   */
  totalPrice: number;
  /**
   * Discounts that have been applied on the cart.
   */
  discounts?: Discount[];
}

export interface Address {
  /**
   * The unique identifier for the address.
   */
  id: string;
  /**
   * The customer's first name.
   */
  mask: string;
}

export interface AddressFields {
  /**
   * The type of address.
   * @example "billing, shipping"
   */
  type: string;
  /**
   * The customer's first name.
   */
  firstName: string;
  /**
   * The customer's last name.
   */
  lastName: string;
  /**
   * Company name.
   */
  company: string;
  /**
   * The customer's billing address street number.
   */
  streetNumber: string;
  /**
   * The customer's billing address apartment number.
   */
  apartments: string;
  /**
   * The customer's billing address zip code.
   */
  zipCode: string;
  /**
   * The customer's billing address city.
   */
  city: string;
  /**
   * The customer's billing address country.
   */
  country: string;
}

export interface Card {
  /**
   * Unique identifier for the card.
   */
  id: string;
  /**
   * Masked card number. Contains only the last 4 digits.
   * @example "4242"
   */
  mask: string;
  /**
   * The card's brand.
   * @example "Visa, Mastercard, etc."
   */
  provider: string;
}
export interface CardFields {
  /**
   *  Name on the card.
   */
  cardHolder: string;
  /**
   * The card's number, consisting of 16 digits.
   */
  cardNumber: string;
  /**
   * The card's expiry month and year, in the format MM/YY.
   * @example "01/25"
   */
  cardExpireDate: string;
  /**
   * The card's security code, consisting of 3 digits.
   */
  cardCvc: string;
  /**
   *  The customer's first name.
   */
  firstName: string;
  /**
   * The customer's last name.
   */
  lastName: string;
  /**
   * Company name.
   */
  company: string;
  /**
   * The customer's billing address street number.
   */
  streetNumber: string;
  /**
   * The customer's billing address zip code.
   */
  zipCode: string;
  /**
   * The customer's billing address city.
   */
  city: string;
  /**
   * The customer's billing address country.
   */
  country: string;
}

export type Page = {
  /**
   * The unique identifier for the page.
   */
  id: string;
  /**
   * Page name, as displayed on the storefront.
   */
  name: string;
  /**
   * Relative URL on the storefront for this page.
   */
  url?: string;
  /**
   * HTML or variable that populates this page’s `<body>` element, in default/desktop view. Required in POST if page type is `raw`.
   */
  body: string;
  /**
   * If true, this page appears in the storefront’s navigation menu.
   */
  is_visible?: boolean;
  /**
   * Order in which this page should display on the storefront. (Lower integers specify earlier display.)
   */
  sort_order?: number;
};

export interface WishlistItem {
  /**
   * The unique identifier for the item.
   */
  id: string;
  /**
   * The unique identifier for the product associated with the wishlist item.
   */
  productId: string;
  /**
   * The unique identifier for the product variant associated with the wishlist item.
   */
  variantId: string;
  /**
   * The product associated with the wishlist item.
   */
  product: Product;
}

export interface Wishlist {
  /**
   * The unique identifier for the wishlist.
   */
  id: string;
  /**
   * List of items in the wishlist.
   */
  items: WishlistItem[];

  /**
   * Some providers require a token to add an item to a wishlist
   */
  token?: string;
}
