import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET: ユーザー一覧取得
export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

// POST: ユーザー作成
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, startDate } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "name と email は必須です" },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      startDate: startDate ? new Date(startDate) : new Date(),
    },
  });

  return NextResponse.json(user, { status: 201 });
}
