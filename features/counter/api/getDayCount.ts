import { prisma } from "@/lib/prisma";

export async function getDayCount(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { startDate: true },
  });

  if (!user) {
    return 0;
  }

  const now = new Date();
  const startDate = new Date(user.startDate);

  // 日数の差を計算（時間を無視して日付だけで計算）
  const diffTime = now.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
}

export async function resetStartDate(userId: string): Promise<Date> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { startDate: new Date() },
    select: { startDate: true },
  });

  return user.startDate;
}
