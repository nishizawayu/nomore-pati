import { prisma } from "@/lib/prisma";
import { NewsCategory } from "../types";

// 公開済みニュース一覧を取得
export async function getPublishedNews(limit?: number) {
  const news = await prisma.news.findMany({
    where: {
      published: true,
      publishedAt: { not: null },
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return news;
}

// ニュース詳細を取得
export async function getNewsById(id: string) {
  const news = await prisma.news.findUnique({
    where: { id },
  });

  return news;
}

// 全ニュース一覧を取得（管理用）
export async function getAllNews() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  return news;
}

// ニュースを作成
export async function createNews(data: {
  title: string;
  content: string;
  category: NewsCategory;
  published?: boolean;
}) {
  const news = await prisma.news.create({
    data: {
      title: data.title,
      content: data.content,
      category: data.category,
      published: data.published ?? false,
      publishedAt: data.published ? new Date() : null,
    },
  });

  return { success: true, news };
}

// ニュースを更新
export async function updateNews(
  id: string,
  data: {
    title?: string;
    content?: string;
    category?: NewsCategory;
    published?: boolean;
  }
) {
  const existing = await prisma.news.findUnique({ where: { id } });

  if (!existing) {
    return { success: false, error: "ニュースが見つかりません" };
  }

  // 公開状態が変更された場合
  let publishedAt = existing.publishedAt;
  if (data.published !== undefined && data.published !== existing.published) {
    publishedAt = data.published ? new Date() : null;
  }

  const news = await prisma.news.update({
    where: { id },
    data: {
      ...data,
      publishedAt,
    },
  });

  return { success: true, news };
}

// ニュースを削除
export async function deleteNews(id: string) {
  const existing = await prisma.news.findUnique({ where: { id } });

  if (!existing) {
    return { success: false, error: "ニュースが見つかりません" };
  }

  await prisma.news.delete({ where: { id } });

  return { success: true };
}
