import fetcher from "@lib/fetcher";
import {
  GetAllProductsQuery,
  Product as ShopifyProduct,
  CollectionEdge,
  GetProductBySlugQuery,
  GetCustomerQuery,
  GetCustomerQueryVariables,
  Mutation,
  CheckoutLineItemsAddPayload,
  MutationCheckoutLineItemsUpdateArgs,
  CheckoutCreatePayload,
} from "@lib/schemas/schema";

import {
  getAllProductsQuery,
  normalizeProduct,
  getSiteCollectionsQuery,
  normalizeCategory,
  getProductQuery,
  getCheckoutQuery,
  checkoutLineItemAddMutation,
  checkoutCreateMutation,
  checkoutLineItemUpdateMutation,
  checkoutLineItemRemoveMutation,
  getCustomerQuery,
  //getCustomerToken,
  customerCreateMutation,
  customerAccessTokenCreateMutation,
  customerAccessTokenDeleteMutation,
} from "@lib/utils";
import { TAGS } from "@lib/const";
import { normalizeCart } from "@lib/utils/normalize";

export async function getCategories({
  query = getSiteCollectionsQuery,
  config,
  variables = {
    first: 250,
  },
}: {
  url?: string;
  config?: { locale?: string; locales?: string[] };

  variables?: any;
  preview?: boolean;
  query?: string;
} = {}) {
  // const { locales = ["en-US", "es"] } = config!;
  const data = await fetcher({
    query,
    variables,
    //locale,
    tags: [TAGS.collections],
  });

  //console.log("categorytccc",data.collections?.edges);
  return (
    data.collections?.edges?.map(({ node }: CollectionEdge) =>
      normalizeCategory(node)
    ) ?? []
  );
}
export async function getAllProducts({
  variables,
}: //cache = "no-store",
{
  query?: string;
  variables?: any;
  config?: { locale?: string; locales?: string[] };
  preview?: boolean;
  cache?: any;
} = {}) {
  const data = await fetcher<GetAllProductsQuery>({
    query: getAllProductsQuery,

    variables,
    // cache,
    tags: [TAGS.products],
  });
  let products = data.products?.edges;

  return {
    products: products?.map(({ node }) =>
      normalizeProduct(node as ShopifyProduct)
    ),
  };
}
export async function getProduct({
  variables,
  config,
}: {
  variables: any;
  config?: { locale?: string; locales?: string[] };
  preview?: boolean;
}) {
  const { productByHandle } = await fetcher<GetProductBySlugQuery>({
    query: getProductQuery,

    variables,
    tags: [TAGS.products],
  });

  return {
    ...(productByHandle && {
      product: normalizeProduct(productByHandle as ShopifyProduct),
    }),
  };
}

export async function signup(variables: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const { customerCreate } = await fetcher<Mutation>({
    query: customerCreateMutation,

    variables: {
      input: {
        firstName: variables.firstName,
        lastName: variables.lastName,
        email: variables.email,
        password: variables.password,
      },
    },
  });

  return customerCreate;
}

export async function login(variables: { email: string; password: string }) {
  const { customerAccessTokenCreate } = await fetcher<Mutation>({
    query: customerAccessTokenCreateMutation,

    variables: {
      input: { email: variables.email, password: variables.password },
    },
    cache: "no-store",
  });

  return customerAccessTokenCreate ?? null;
}
export async function logout(token?: string) {
  await fetcher<void>({
    query: customerAccessTokenDeleteMutation,

    variables: {
      customerAccessToken: token,
    },
    cache: "no-store",
  });
}

export async function getCustomer(token?: string) {
  const { customer } = await fetcher<GetCustomerQuery, void>({
    query: getCustomerQuery,

    variables: { customerAccessToken: token },
    cache: "no-store",
  });

  return (
    customer && {
      id: customer.id,
      firstName: customer.firstName ?? "N/A",
      lastName: customer.lastName ?? "",
      ...(customer.email && { email: customer.email }),
      ...(customer.phone && { phone: customer.phone }),
    }
  );
}
//const cartId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE);
type CartItemBody = {
  variantId: string;

  productId?: string;

  quantity?: number;
};

export async function addCartItem(cartId: string, variables: CartItemBody) {
  const { checkoutLineItemsAdd } = await fetcher<{
    checkoutLineItemsAdd: CheckoutLineItemsAddPayload;
  }>({
    query: checkoutLineItemAddMutation,

    variables: {
      checkoutId: cartId,
      lineItems: {
        variantId: variables.variantId,
        quantity: variables.quantity ?? 1,
      },
    },
    cache: "no-store",
  });

  return (
    checkoutLineItemsAdd?.checkout &&
    (normalizeCart(checkoutLineItemsAdd?.checkout) as any)
  );
}
export async function updateCart(
  cartId: string,
  variables: {
    id?: string;
    productId?: string;
    quantity?: number;
  }
) {
  const { checkoutLineItemsUpdate } = await fetcher<Mutation>({
    query: checkoutLineItemUpdateMutation,

    variables: {
      checkoutId: cartId,
      lineItemIds: [{ id: variables.id, quantity: variables.quantity }],
    },
    cache: "no-store",
  });

  return (
    checkoutLineItemsUpdate?.checkout &&
    normalizeCart(checkoutLineItemsUpdate?.checkout)
  );
}
export async function removeCartItem(
  cartId: string,
  variables: { id?: string }
) {
  const { checkoutLineItemsRemove } = await fetcher<Mutation>({
    query: checkoutLineItemRemoveMutation,
    variables: { checkoutId: cartId, lineItemIds: [variables.id] },
    cache: "no-store",
  });

  return (
    checkoutLineItemsRemove?.checkout &&
    normalizeCart(checkoutLineItemsRemove?.checkout)
  );
}
export async function createCart() {
  const { checkoutCreate } = await fetcher<{
    checkoutCreate: CheckoutCreatePayload;
  }>({
    query: checkoutCreateMutation,

    // variables: {
    //   input: { lineItems: variables },
    // },
    cache: "no-store",
  });

  return checkoutCreate?.checkout && normalizeCart(checkoutCreate?.checkout);
}
export async function getCart(cartId: string) {
  const { node } = await fetcher<any, void>({
    query: getCheckoutQuery,

    variables: {
      checkoutId: cartId,
    },
    cache: "no-store",
    tags: [TAGS.cart],
  });

  return node && normalizeCart(node);
}
