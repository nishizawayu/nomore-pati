export type NewsCategory = "INFO" | "UPDATE" | "MAINTENANCE" | "EVENT";

export type News = {
  id: string;
  title: string;
  content: string;
  category: NewsCategory;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export const categoryLabels: Record<NewsCategory, string> = {
  INFO: "お知らせ",
  UPDATE: "アップデート",
  MAINTENANCE: "メンテナンス",
  EVENT: "イベント",
};

export const categoryColors: Record<NewsCategory, string> = {
  INFO: "bg-blue-100 text-blue-800",
  UPDATE: "bg-green-100 text-green-800",
  MAINTENANCE: "bg-yellow-100 text-yellow-800",
  EVENT: "bg-purple-100 text-purple-800",
};
