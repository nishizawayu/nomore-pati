import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

// GET: ユーザー詳細取得
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json(
      { error: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

// PUT: ユーザー更新
export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const { name, email, startDate } = body;

  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(email && { email }),
      ...(startDate && { startDate: new Date(startDate) }),
    },
  });

  return NextResponse.json(user);
}

// DELETE: ユーザー削除
export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;

  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ message: "ユーザーを削除しました" });
}
