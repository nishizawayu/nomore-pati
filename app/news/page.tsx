import Link from "next/link";
import { getPublishedNews, NewsList, News } from "@/features/news";

export default async function NewsPage() {
  const news = await getPublishedNews();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              ← 戻る
            </Link>
            <h1 className="text-xl font-bold text-gray-800">お知らせ</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <section className="bg-white rounded-lg shadow p-6">
          <NewsList news={news as News[]} />
        </section>
      </main>
    </div>
  );
}
