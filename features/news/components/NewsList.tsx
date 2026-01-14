import Link from "next/link";
import { News, categoryLabels, categoryColors, NewsCategory } from "../types";

type Props = {
  news: News[];
};

export function NewsList({ news }: Props) {
  if (news.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        お知らせはありません
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {news.map((item) => (
        <li key={item.id}>
          <Link
            href={`/news/${item.id}`}
            className="block py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span
                className={`w-24 text-center shrink-0 px-2 py-1 text-xs font-medium rounded ${
                  categoryColors[item.category as NewsCategory]
                }`}
              >
                {categoryLabels[item.category as NewsCategory]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-medium truncate">
                  {item.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString("ja-JP")
                    : ""}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
