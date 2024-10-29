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
  const data: Omit<User, "password"> = await response.json();
  return data;
}

export async function deleteUserAccount(id: number) {
  await fetch(`/api/v1/users/${id}`, {
    method: "DELETE",
  });
}
