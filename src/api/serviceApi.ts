import ServiceSchema from "@/schemas/service";
import { ApiUrl } from "@prisma/client";
import { z } from "zod";

export const putServices = async (
  payload: z.infer<typeof ServiceSchema.putServices>
) => {
  const normalized = Object.values(payload);
  const response = await fetch("/api/v1/services", {
    method: "PUT",
    body: JSON.stringify(normalized),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("You don't have permission to update services");
    }
    throw new Error("Failed to update services");
  }
  const data = await response.json();
  return data;
};

export const getServices = async () => {
  const response = await fetch("/api/v1/services");
  const data: ApiUrl[] = await response.json();
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("You don't have permission to update services");
    }
    throw new Error("Failed to update services");
  }
  return data;
};
