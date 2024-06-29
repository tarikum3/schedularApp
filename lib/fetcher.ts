import { getError } from "@lib/utils/errors";
import { API_TOKEN, API_URL } from "@lib/const";

export type Fetcher<T = any, B = any> = (
  options: FetcherOptions<B>
) => T | Promise<T>;

export type FetcherOptions<Body = any> = {
  url?: string;
  query?: string;
  method?: string;
  variables?: any;
  body?: Body;
  locale?: string;
  cache?: RequestCache;
  headers?: HeadersInit;
  tags?: string[];
};

const fetchGraphqlApi: <T = any, B = any>(
  options: FetcherOptions<B>
) => T | Promise<T> = async ({
  url = API_URL,
  method = "POST",
  variables = {},
  query,
  locale,
  cache = "force-cache",
  tags,
}) => {
  // const { locale, ...vars } = variables ?? {}
  try {
    const res = await fetch(url, {
      method,
      body: JSON.stringify({ query, variables: variables }),
      headers: {
        "X-Shopify-Storefront-Access-Token": API_TOKEN!,
        "Content-Type": "application/json",
        ...(locale && {
          "Accept-Language": locale,
        }),
      },
      cache,
      ...(tags && { next: { tags } }),
    });

    const { data, errors, status } = await res.json();

    if (errors) {
      throw getError(errors, status);
    }

    return { ...data, res };
  } catch (err) {
    throw getError(
      [
        {
          message: `${err} \n Most likely related to an unexpected output. E.g: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN & NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN might be incorect.`,
        },
      ],
      500
    );
  }
};
//export default fetchGraphqlApi
//const fetcherNew:<T = any, B = any>(options: FetcherOptions<B>) => T | Promise<T>=fetchGraphqlApi;
export default fetchGraphqlApi;
