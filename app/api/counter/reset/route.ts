import { auth } from "@/lib/auth";
import { resetStartDate } from "@/features/counter";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const newStartDate = await resetStartDate(session.user.id);

  return NextResponse.json({
    message: "カウンターをリセットしました",
    startDate: newStartDate,
  });
}
