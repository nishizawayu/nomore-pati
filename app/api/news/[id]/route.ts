import { getNewsById, updateNews, deleteNews } from "@/features/news";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Params = { params: Promise<{ id: string }> };

// ニュース詳細を取得
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    return NextResponse.json(
      { error: "ニュースが見つかりません" },
      { status: 404 }
    );
  }

  // 非公開の場合は管理者のみ
  if (!news.published) {
    const adminKey = request.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: "ニュースが見つかりません" },
        { status: 404 }
      );
    }
  }

  return NextResponse.json(news);
}

// ニュースを更新（管理者用）
const updateSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  category: z.enum(["INFO", "UPDATE", "MAINTENANCE", "EVENT"]).optional(),
  published: z.boolean().optional(),
});

export async function PATCH(request: NextRequest, { params }: Params) {
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = updateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const result = await updateNews(id, parsed.data);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result);
}

// ニュースを削除（管理者用）
export async function DELETE(request: NextRequest, { params }: Params) {
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  const { id } = await params;
  const result = await deleteNews(id);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ message: "削除しました" });
}
