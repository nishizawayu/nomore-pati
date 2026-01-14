import { auth } from "@/lib/auth";
import Link from "next/link";
import { SignOutButton } from "@/features/auth";
import { DayCounter, ResetButton, getDayCount } from "@/features/counter";
import { getPublishedNews, NewsList, News } from "@/features/news";
import {
  NotificationBell,
  getNotifications,
  getUnreadCount,
  Notification,
} from "@/features/notification";
import { TestimonialCarousel, MoneySimulator } from "@/features/landing";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await auth();

  let dayCount = 0;
  let startDate = new Date();
  let notifications: Notification[] = [];
  let unreadCount = 0;
  const latestNews = await getPublishedNews(3);

  if (session?.user?.id) {
    dayCount = await getDayCount(session.user.id);
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { startDate: true },
    });
    if (user) {
      startDate = user.startDate;
    }

    // 通知を取得
    notifications = (await getNotifications(session.user.id)) as Notification[];
    unreadCount = await getUnreadCount(session.user.id);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">パチ禁カウンター</h1>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <NotificationBell
                  notifications={notifications}
                  unreadCount={unreadCount}
                />
                <span className="text-gray-600">{session.user.name} さん</span>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-blue-600 hover:underline"
                >
                  ログイン
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  新規登録
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {session?.user ? (
          <div className="space-y-6">
            <DayCounter dayCount={dayCount} startDate={startDate} />
            <div className="text-center">
              <p className="text-gray-500 mb-4">頑張って続けましょう！</p>
              <ResetButton />
            </div>
            <div className="flex justify-center gap-4">
              <Link
                href="/friends"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              >
                <span>👥</span>
                <span>フレンド</span>
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
              >
                <span>⚙️</span>
                <span>プロフィール</span>
              </Link>
            </div>

            {/* お知らせ */}
            <section className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">お知らせ</h2>
                <Link href="/news" className="text-blue-600 hover:text-blue-800 text-sm">
                  すべて見る →
                </Link>
              </div>
              <NewsList news={latestNews as News[]} />
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* ヒーローセクション */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                今日から、新しい自分へ
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                パチンコ・スロットをやめたいあなたを応援します
              </p>
              <div className="text-6xl font-bold mb-2">0日目</div>
              <p className="text-blue-200 mb-8">ここから始まる</p>
              <Link
                href="/signup"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                今すぐ始める
              </Link>
            </section>

            {/* お金シミュレーター */}
            <MoneySimulator />

            {/* なぜやめるべきか */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                パチンコをやめると得られるもの
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">💰</div>
                  <h4 className="font-bold text-gray-800 mb-2">お金の余裕</h4>
                  <p className="text-gray-600 text-sm">
                    月に数万円〜数十万円の出費がなくなり、貯金や自己投資に回せます
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">⏰</div>
                  <h4 className="font-bold text-gray-800 mb-2">時間の自由</h4>
                  <p className="text-gray-600 text-sm">
                    家族や友人との時間、趣味、自己成長に使える時間が増えます
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">😌</div>
                  <h4 className="font-bold text-gray-800 mb-2">心の平穏</h4>
                  <p className="text-gray-600 text-sm">
                    負けた時の後悔や罪悪感から解放され、穏やかな毎日を過ごせます
                  </p>
                </div>
              </div>
            </section>

            {/* アプリの特徴 */}
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                パチ禁カウンターの3つの力
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center shrink-0 font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">日数の可視化</h4>
                    <p className="text-gray-600">
                      「今日で◯日目」という数字が、あなたの努力を目に見える形にします。
                      積み重ねた日数は、次の一日を乗り越える力になります。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center shrink-0 font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">フレンドの支え</h4>
                    <p className="text-gray-600">
                      一人で戦う必要はありません。同じ目標を持つ仲間と繋がり、
                      お互いの進捗を確認し合うことで、モチベーションを維持できます。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-12 h-12 flex items-center justify-center shrink-0 font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">リセットしても大丈夫</h4>
                    <p className="text-gray-600">
                      もし失敗してしまっても、またここから始められます。
                      大切なのは諦めないこと。何度でも挑戦できる環境がここにあります。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ユーザーの声 */}
            <TestimonialCarousel />

            {/* モチベーションメッセージ */}
            <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">🌟</div>
              <blockquote className="text-xl text-gray-700 font-medium mb-4">
                「千里の道も一歩から」
              </blockquote>
              <p className="text-gray-600 mb-6">
                今日という日が、あなたの新しい人生の1日目になるかもしれません。<br />
                完璧を目指す必要はありません。まずは今日一日、始めてみませんか？
              </p>
              <Link
                href="/signup"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg"
              >
                無料で始める
              </Link>
            </section>

            {/* 最新のお知らせ */}
            {latestNews.length > 0 && (
              <section className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">お知らせ</h3>
                  <Link href="/news" className="text-blue-600 hover:text-blue-800 text-sm">
                    すべて見る →
                  </Link>
                </div>
                <NewsList news={latestNews as News[]} />
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
