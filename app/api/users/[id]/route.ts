import { getUserById, updateUser, deleteUser } from "@/features/user";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) {
    return NextResponse.json(
      { error: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const { name, email, startDate } = body;

  const user = await updateUser(id, {
    name,
    email,
    startDate: startDate ? new Date(startDate) : undefined,
  });

  return NextResponse.json(user);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;

  await deleteUser(id);

  return NextResponse.json({ message: "ユーザーを削除しました" });
}
