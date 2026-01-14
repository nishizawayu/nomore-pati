import { prisma } from "@/lib/prisma";
import { UserUpdateParams } from "../types";

const userSelect = {
  id: true,
  name: true,
  email: true,
  startDate: true,
  createdAt: true,
  updatedAt: true,
};

export async function updateUser(id: string, params: UserUpdateParams) {
  return prisma.user.update({
    where: { id },
    data: {
      ...(params.name && { name: params.name }),
      ...(params.email && { email: params.email }),
      ...(params.startDate && { startDate: params.startDate }),
    },
    select: userSelect,
  });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}
