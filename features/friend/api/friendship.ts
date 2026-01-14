import { prisma } from "@/lib/prisma";
import { Friend } from "../types";

// フレンド一覧を取得
export async function getFriends(userId: string): Promise<Friend[]> {
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [
        { senderId: userId, status: "ACCEPTED" },
        { receiverId: userId, status: "ACCEPTED" },
      ],
    },
    include: {
      sender: {
        select: { id: true, name: true, email: true, startDate: true },
      },
      receiver: {
        select: { id: true, name: true, email: true, startDate: true },
      },
    },
  });

  const now = new Date();

  return friendships.map((f) => {
    const friend = f.senderId === userId ? f.receiver : f.sender;
    const diffTime = now.getTime() - new Date(friend.startDate).getTime();
    const dayCount = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    return {
      id: friend.id,
      name: friend.name,
      email: friend.email,
      startDate: friend.startDate,
      dayCount,
    };
  });
}

// 受信したフレンド申請を取得
export async function getPendingRequests(userId: string) {
  return prisma.friendship.findMany({
    where: {
      receiverId: userId,
      status: "PENDING",
    },
    include: {
      sender: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// 送信したフレンド申請を取得
export async function getSentRequests(userId: string) {
  return prisma.friendship.findMany({
    where: {
      senderId: userId,
      status: "PENDING",
    },
    include: {
      receiver: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// フレンド申請を送信
export async function sendFriendRequest(senderId: string, receiverId: string) {
  // 自分自身には送れない
  if (senderId === receiverId) {
    return { success: false, error: "自分自身にフレンド申請はできません" };
  }

  // 相手のユーザーを検索
  const receiver = await prisma.user.findUnique({
    where: { id: receiverId },
  });

  if (!receiver) {
    return { success: false, error: "ユーザーが見つかりません" };
  }

  // 既存の申請をチェック
  const existing = await prisma.friendship.findFirst({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
  });

  if (existing) {
    if (existing.status === "ACCEPTED") {
      return { success: false, error: "既にフレンドです" };
    }
    if (existing.status === "PENDING") {
      return { success: false, error: "既に申請中です" };
    }
  }

  // フレンド申請を作成
  const friendship = await prisma.friendship.create({
    data: {
      senderId,
      receiverId,
    },
  });

  return { success: true, friendship };
}

// フレンド申請を承認
export async function acceptFriendRequest(friendshipId: string, userId: string) {
  const friendship = await prisma.friendship.findUnique({
    where: { id: friendshipId },
  });

  if (!friendship) {
    return { success: false, error: "申請が見つかりません" };
  }

  if (friendship.receiverId !== userId) {
    return { success: false, error: "この申請を承認する権限がありません" };
  }

  const updated = await prisma.friendship.update({
    where: { id: friendshipId },
    data: { status: "ACCEPTED" },
  });

  return { success: true, friendship: updated };
}

// フレンド申請を拒否
export async function rejectFriendRequest(friendshipId: string, userId: string) {
  const friendship = await prisma.friendship.findUnique({
    where: { id: friendshipId },
  });

  if (!friendship) {
    return { success: false, error: "申請が見つかりません" };
  }

  if (friendship.receiverId !== userId) {
    return { success: false, error: "この申請を拒否する権限がありません" };
  }

  await prisma.friendship.delete({
    where: { id: friendshipId },
  });

  return { success: true };
}

// フレンドを削除
export async function removeFriend(friendshipId: string, userId: string) {
  const friendship = await prisma.friendship.findFirst({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId },
      ],
      id: friendshipId,
      status: "ACCEPTED",
    },
  });

  if (!friendship) {
    return { success: false, error: "フレンド関係が見つかりません" };
  }

  await prisma.friendship.delete({
    where: { id: friendshipId },
  });

  return { success: true };
}
