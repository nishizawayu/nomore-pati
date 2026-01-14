import { getPublishedNews, createNews } from "@/features/news";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// 公開済みニュース一覧を取得
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  const news = await getPublishedNews(limit);

  return NextResponse.json(news);
}

// ニュースを作成（管理者用 - 簡易的な実装）
const createSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  content: z.string().min(1, "内容を入力してください"),
  category: z.enum(["INFO", "UPDATE", "MAINTENANCE", "EVENT"]),
  published: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  // 簡易的な管理者チェック（本番では適切な認証を実装）
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = createSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const result = await createNews(parsed.data);

  return NextResponse.json(result);
}
