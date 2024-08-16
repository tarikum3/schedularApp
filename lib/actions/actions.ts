"use server";

import { TAGS } from "@lib/const";
// import {
//   addCartItem,
//   createCart,
//   getCart,
//   removeCartItem,
//   updateCart,
// } from "@lib/services";
import {
  upsertCartItem,
  createCart,
  getCart,
  deleteCartItem,
  updateCart,
  createCustomer,
} from "@lib/services/prismaServices";
//import { login, logout, signup } from "@lib/services";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

// export type State = {
//   errors?: {
//     customerId?: string[];
//     amount?: string[];
//     status?: string[];
//   };
//   message?: string | null;
// };

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    if (!cart?.id) {
      return "Missing Cart ID";
    }
    cartId = cart.id;
    cookies().set("cartId", cartId);
  }

  if (!selectedVariantId) {
    return "Missing product variant ID";
  }

  try {
    // await addCartItem(cartId, { variantId: selectedVariantId });
    const cartitem = await upsertCartItem(cartId, selectedVariantId);
    // console.log("cartitem", cartitem);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, id: string) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    // await removeCartItem(cartId, { id });
    await deleteCartItem(id);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateCartItem(
  prevState: any,
  payload: {
    id?: string;
    productId?: string;
    quantity?: number;
  }
) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  const { id, productId, quantity } = payload;

  try {
    if (quantity === 0) {
      // await removeCartItem(cartId, { id });
      await deleteCartItem(id!);
      revalidateTag(TAGS.cart);
      return;
    }

    // await updateCart(cartId, {
    //   id: id,
    //   productId: productId,
    //   quantity,
    // });
    const update = await upsertCartItem(cartId, productId!, quantity);
    console.log("cartitemupdate", update);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error updating item quantity";
  }
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
    console.log("customerrfrom", "from");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

type RegisterState = {
  errors?: {
    email?: string[];
    password?: string[];
    firstName?: string[];
    lastName?: string[];
  };
  message?: string | null;
};
export async function register(
  prevState: RegisterState | undefined,
  formData: FormData
) {
  try {
    const validatedFields = FormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    });
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. ",
      };
    }
    const customerr = await createCustomer({ ...validatedFields.data });
    // await signup({ ...validatedFields.data });

    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

interface UpdateCartParams {
  id: string;
  name: string;
  email: string;
  companyName: string;
  vatNumber: string;
  phone: string;
  country: string;
  city: string;
  billingName: string;
  billingEmail: string;
  billingCompanyName: string;
  billingVatNumber: string;
  paymentMethod: string;
  deliveryMethod: string;
}
const CartSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  companyName: z.string().optional(),
  vatNumber: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  billingName: z.string().optional(),
  billingEmail: z.string().optional(),
  billingCompanyName: z.string().optional(),
  billingVatNumber: z.string().optional(),
  paymentMethod: z.string().min(1),
  deliveryMethod: z.string().min(1),
});

export async function updateCartAction(
  prevState: UpdateCartParams | undefined,
  formData: FormData
) {
  try {
    // Extract fields from formData
    const cartData = {
      id: formData.get("id"),
      name: formData.get("name"),
      email: formData.get("email"),
      companyName: formData.get("companyName"),
      vatNumber: formData.get("vatNumber"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      city: formData.get("city"),
      billingName: formData.get("billingName"),
      billingEmail: formData.get("billingEmail"),
      billingCompanyName: formData.get("billingCompanyName"),
      billingVatNumber: formData.get("billingVatNumber"),
      paymentMethod: formData.get("paymentMethod"),
      deliveryMethod: formData.get("deliveryMethod"),
    };

    // Validate fields with FormSchema
    const validatedFields = CartSchema.safeParse(cartData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Validation failed.",
      };
    }

    const cart = await updateCart(validatedFields.data.id, {
      ...validatedFields.data,
    });
  } catch (error) {
    console.error(error);
    return {
      errors: { general: ["An error occurred while updating the cart."] },
      message: "An error occurred.",
    };
  }
}

export async function logOut() {
  try {
    await signOut();
    //logout();
  } catch (error) {
    if (error instanceof Error) {
      return "Something went wrong.";
    }
    throw error;
  }
}
