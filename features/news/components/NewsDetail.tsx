import { News, categoryLabels, categoryColors, NewsCategory } from "../types";

type Props = {
  news: News;
};

export function NewsDetail({ news }: Props) {
  return (
    <article className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            categoryColors[news.category as NewsCategory]
          }`}
        >
          {categoryLabels[news.category as NewsCategory]}
        </span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">{news.title}</h1>

      <p className="text-sm text-gray-500 mb-6">
        {news.publishedAt
          ? new Date(news.publishedAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : ""}
      </p>

      <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
        {news.content}
      </div>
    </article>
  );
}
