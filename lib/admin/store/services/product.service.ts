import { Prisma } from "@prisma/client";
import { serviceApi } from "./serviceApi";

// Define a simpler Product type without nested includes
export type Product = Prisma.ProductGetPayload<{}>;

// Define a detailed Product type with nested includes for getProductById
export type ProductDetails = Prisma.ProductGetPayload<{
  include: {
    images: true;
    variants: {
      include: {
        variantOptions: {
          include: { optionValue: { include: { option: true } } };
        };
      };
    };
    price: true;
    options: {
      include: {
        values: { include: { option: true } };
      };
    };
  };
}>;

// Define the type for the query parameters
interface GetProductsParams {
  page?: number;
  limit?: number;
  searchText?: string;
}

export const productApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Products Query (uses the simpler Product type)
    getProducts: builder.query<Product[], GetProductsParams>({
      query: ({ page = 1, limit = 10, searchText = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(searchText && { searchText: encodeURIComponent(searchText) }),
        });

        return {
          url: `admin/product?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: {
        data: { products: Product[] };
      }): Product[] => {
        if (response?.data?.products) {
          return response.data.products;
        }

        return [];
      },
      providesTags: ["Product"],
    }),

    // Get Product by ID Query (uses the detailed ProductDetails type)
    getProductById: builder.query<ProductDetails, string>({
      query: (id) => ({
        url: `admin/product/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Create Product Mutation (uses the simpler Product type)
    createProduct: builder.mutation<Product, Prisma.ProductCreateInput>({
      query: (product) => ({
        url: "admin/product",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    // Update Product Mutation (uses the simpler Product type)
    updateProduct: builder.mutation<
      Product,
      { id: string } & Prisma.ProductUpdateInput
    >({
      query: (product) => {
        const { id } = product;

        return {
          url: `admin/product/${id}`,
          method: "PUT",
          body: product,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    // Upload Product Image Mutation (if needed)
    uploadProductImage: builder.mutation<any, { id: string; image: File }>({
      query: ({ id, image }) => {
        const formData = new FormData();
        formData.append("image", image);

        return {
          url: `admin/product/${id}/upload-image`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
  }),
});

// Export the hooks with improved types
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} = productApi;
