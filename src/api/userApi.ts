import UserSchema from "@/schemas/account";
import create from "@/schemas/account/create";
import { User } from "@prisma/client";
import { z } from "zod";

export async function createUser(
  user: Omit<z.infer<typeof create>, "confirmPassword">
) {
  const response = await fetch("/api/v1/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: Omit<User, "password"> = await response.json();
  return data;
}

export async function getAllUsers() {
  const response = await fetch("/api/v1/users");
  const data: Omit<User[], "password"> = await response.json();
  return data;
}

export async function updateUserData(
  payload: Omit<User, "updatedAt" | "createdAt" | "password">
) {
  const response = await fetch(`/api/v1/users/${payload.id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    switch (response.status) {
      case 403:
        throw new Error("You are not authorized to perform this action");
      default:
        throw new Error("Something went wrong!");
    }
  }
  const data: Omit<User, "password"> = await response.json();
  return data;
}

export async function deleteUserAccount(id: number) {
  await fetch(`/api/v1/users/${id}`, {
    method: "DELETE",
  });
}

export async function changePassword({
  id,
  payload,
}: {
  id: string;
  payload: z.infer<typeof UserSchema.changePassword>;
}) {
  const response = await fetch(`/api/v1/users/${id}/change-pass`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error("Wrong password");
      case 403:

      default:
        throw new Error("Something went wrong!");
    }
  }

  const data = await response.json();

  return data;
}

export async function resetPassword(id: string) {
  const response = await fetch(`/api/v1/users/${id}/reset-pass`, {
    method: "PATCH",
  });

  if (!response.ok) {
    switch (response.status) {
      case 403:
        throw new Error("You are not authorized to perform this action");
      case 404:
        throw new Error("User not found");

      default:
        throw new Error("Something went wrong!");
    }
  }

  const data = await response.json();

  return data;
}
