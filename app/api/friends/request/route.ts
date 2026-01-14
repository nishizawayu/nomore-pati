import { auth } from "@/lib/auth";
import { sendFriendRequest } from "@/features/friend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const body = await request.json();
  const { friendId } = body;

  if (!friendId) {
    return NextResponse.json(
      { error: "ユーザーIDを入力してください" },
      { status: 400 }
    );
  }

  const result = await sendFriendRequest(session.user.id, friendId);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ message: "フレンド申請を送信しました" });
}
