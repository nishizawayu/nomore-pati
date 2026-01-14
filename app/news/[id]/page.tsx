import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsById, NewsDetail, News } from "@/features/news";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news || !news.published) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/news" className="text-gray-600 hover:text-gray-800">
              ← お知らせ一覧
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <NewsDetail news={news as News} />
      </main>
    </div>
  );
}
