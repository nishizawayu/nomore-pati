import { auth } from "@/lib/auth";
import { markAllAsRead } from "@/features/notification";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  await markAllAsRead(session.user.id);

  return NextResponse.json({ success: true });
}
