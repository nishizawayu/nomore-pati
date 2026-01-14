import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      startDate: true,
      createdAt: true,
    },
  });

  return user;
}

export async function updateName(userId: string, name: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { name },
    select: { id: true, name: true },
  });

  return { success: true, user };
}

export async function updateEmail(userId: string, email: string) {
  // 既存のメールアドレスをチェック
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing && existing.id !== userId) {
    return { success: false, error: "このメールアドレスは既に使用されています" };
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { email },
    select: { id: true, email: true },
  });

  return { success: true, user };
}

export async function updatePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { success: false, error: "ユーザーが見つかりません" };
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) {
    return { success: false, error: "現在のパスワードが正しくありません" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return { success: true };
}

export async function updateImage(userId: string, image: string | null) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { image },
    select: { id: true, image: true },
  });

  return { success: true, user };
}
