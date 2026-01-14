import { signup } from "@/features/auth/api/signup";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password } = body;

  const result = await signup({ name, email, password });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(
    { message: "ユーザー登録が完了しました", userId: result.userId },
    { status: 201 }
  );
}
