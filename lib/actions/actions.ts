"use server";

import { TAGS } from "@lib/const";

import {
  createUser,
  createCustomer,
  createAdminUser,
  createNotificationForAllUsers,
  NotificationType,
} from "@lib/services/prismaServices";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { unstable_cache } from "next/cache";
import { addComputedCartPrices } from "@/lib/helper";
import { redirect, RedirectType } from "next/navigation";

export async function deleteCookies(cookieName: string) {
  cookies().delete(cookieName);
  revalidateTag(TAGS.cart);
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

export async function signInWithGoogle() {
  try {
    // const resultt = await signIn("google", {
    //   // callbackUrl: "http://localhost:3000/",
    // });
    console.log("resultt", "uuresultt");
    const resultt = await signIn("google");
    //logout();
    console.log("resultt", resultt);
  } catch (error) {
    //  console.log("errorgggg", error);
    if (error instanceof Error) {
      return "Something went wrong.";
    }
    throw error;
  }
}

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
    const user = await createUser({ ...validatedFields.data });
    const customerr = await createCustomer(user);
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
export async function registerUser(
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
    const user = await createUser({ ...validatedFields.data });
    const customerr = await createAdminUser(user);
    createNotificationForAllUsers({ type: NotificationType.NEW_USER });
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

export async function logOut() {
  try {
    await signOut();
    //logout();
  } catch (error) {
    if (error instanceof AuthError) {
      return "Something went wrong.";
    }
    throw error;
  }
  redirect("/?refresh=true", RedirectType.replace);
}
