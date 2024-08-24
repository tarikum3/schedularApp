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
  //id: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  email: string;
  companyName: string;
  address: string;
  phone: string;
  country: string;
  city: string;
  billingName: string;
  billingEmail: string;
  billingCompanyName: string;
  billingAddress: string;
  paymentMethod: string;
  deliveryMethod: string;
}
const CartSchema = z.object({
  //id: z.string().uuid({ message: "Invalid ID format." }),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  postalCode: z.string().min(1, { message: "Postal code is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  companyName: z.string().min(1, { message: "Company name is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  city: z.string().min(1, { message: "City is required." }),
  billingName: z.string().min(1, { message: "Billing name is required." }),
  billingEmail: z.string().email({ message: "Invalid billing email address." }),
  billingCompanyName: z
    .string()
    .min(1, { message: "Billing company name is required." }),
  billingAddress: z
    .string()
    .min(1, { message: "Billing address is required." }),
  paymentMethod: z.string().min(1, { message: "Payment method is required." }),
  deliveryMethod: z
    .string()
    .min(1, { message: "Delivery method is required." }),
  //sameAsDelivery: z.string().optional(), // You can add a custom message here if needed
});

// .refine(
//   (data) => {
//     if (!data.sameAsDelivery) {
//       return (
//         data.billingName &&
//         data.billingEmail &&
//         data.billingCompanyName &&
//         data.billingAddress
//       );
//     }
//     return true;
//   },
//   {
//     message: "Billing fields are required if sameAsDelivery is false",
//     path: [
//       "billingName",
//       "billingEmail",
//       "billingCompanyName",
//       "billingAddress",
//     ], // this will add the error to all these fields
//   }
// );

export async function updateCartAction(
  prevState: any | undefined,
  formData: FormData
) {
  try {
    // Extract fields from formData
    console.log("formDataformDatah", formData);

    const cartData = {
      // id: formData.get("id"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      postalCode: formData.get("postalCode"),
      email: formData.get("email"),
      companyName: formData.get("companyName"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      city: formData.get("city"),
      billingName: formData.get("sameAsDelivery")
        ? formData.get("firstName")
        : formData.get("billingName"),
      billingEmail: formData.get("sameAsDelivery")
        ? formData.get("email")
        : formData.get("billingEmail"),
      billingCompanyName: formData.get("sameAsDelivery")
        ? formData.get("companyName")
        : formData.get("billingCompanyName"),
      billingAddress: formData.get("sameAsDelivery")
        ? formData.get("address")
        : formData.get("billingAddress"),
      paymentMethod: formData.get("paymentMethod"),
      deliveryMethod: formData.get("deliveryMethod"),
      // sameAsDelivery: formData.get("sameAsDelivery") ?? "",
    };
    console.log("formDataformDatahcartData", cartData);
    // Validate fields with FormSchema
    const validatedFields = CartSchema.safeParse(cartData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Validation failed.",
      };
    }
    let cartId = cookies().get("cartId")?.value;
    const cart = await updateCart(cartId!, {
      ...validatedFields.data,
      sameAsDelivery: undefined,
    });
    revalidateTag(TAGS.cart);
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
