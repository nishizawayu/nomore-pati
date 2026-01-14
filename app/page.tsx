import { auth } from "@/lib/auth";
import Link from "next/link";
import { SignOutButton } from "@/features/auth";
import { DayCounter, ResetButton, getDayCount } from "@/features/counter";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await auth();

  let dayCount = 0;
  let startDate = new Date();

  if (session?.user?.id) {
    dayCount = await getDayCount(session.user.id);
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { startDate: true },
    });
    if (user) {
      startDate = user.startDate;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">パチ禁カウンター</h1>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
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
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 mb-4">
              パチ禁を始めるには、まずログインしてください
            </p>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 inline-block"
            >
              今すぐ始める
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
