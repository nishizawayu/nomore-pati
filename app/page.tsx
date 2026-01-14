import { auth } from "@/lib/auth";
import Link from "next/link";
import { SignOutButton } from "@/features/auth";

export default async function Home() {
  const session = await auth();

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
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 mb-2">パチ禁継続中</p>
            <p className="text-6xl font-bold text-blue-600">0日</p>
            <p className="text-gray-500 mt-2">頑張って続けましょう！</p>
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
