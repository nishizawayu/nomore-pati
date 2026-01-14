import { prisma } from "@/lib/prisma";
import { NotificationType } from "../types";

// ユーザーの通知一覧を取得
export async function getNotifications(userId: string) {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return notifications;
}

// 未読通知数を取得
export async function getUnreadCount(userId: string) {
  const count = await prisma.notification.count({
    where: { userId, read: false },
  });

  return count;
}

// 通知を作成
export async function createNotification(data: {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedUserId?: string;
}) {
  const notification = await prisma.notification.create({
    data: {
      userId: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      relatedUserId: data.relatedUserId,
    },
  });

  return notification;
}

// 通知を既読にする
export async function markAsRead(notificationId: string, userId: string) {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
  });

  if (!notification || notification.userId !== userId) {
    return { success: false, error: "通知が見つかりません" };
  }

  await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });

  return { success: true };
}

// 全ての通知を既読にする
export async function markAllAsRead(userId: string) {
  await prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });

  return { success: true };
}

// フレンド全員に通知を送る（リセット時）
export async function notifyFriendsOfReset(userId: string, userName: string) {
  // 承認済みのフレンドを取得
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [
        { senderId: userId, status: "ACCEPTED" },
        { receiverId: userId, status: "ACCEPTED" },
      ],
    },
  });

  const friendIds = friendships.map((f) =>
    f.senderId === userId ? f.receiverId : f.senderId
  );

  // 各フレンドに通知を作成
  const notifications = await Promise.all(
    friendIds.map((friendId) =>
      createNotification({
        userId: friendId,
        type: "FRIEND_RESET",
        title: "フレンドがリセットしました",
        message: `${userName}さんがパチ禁カウンターをリセットしました。励ましのメッセージを送ってあげましょう！`,
        relatedUserId: userId,
      })
    )
  );

  return notifications;
}
