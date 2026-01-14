import { auth } from "@/lib/auth";
import { resetStartDate } from "@/features/counter";
import { notifyFriendsOfReset } from "@/features/notification";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const newStartDate = await resetStartDate(session.user.id);

  // フレンドに通知を送信
  await notifyFriendsOfReset(session.user.id, session.user.name || "ユーザー");

  return NextResponse.json({
    message: "カウンターをリセットしました",
    startDate: newStartDate,
  });
}
