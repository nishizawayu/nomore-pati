import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/features/auth";
import {
  FriendList,
  FriendRequestForm,
  PendingRequests,
  getFriends,
  getPendingRequests,
  getSentRequests,
} from "@/features/friend";

export default async function FriendsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [friends, pendingRequests, sentRequests] = await Promise.all([
    getFriends(session.user.id),
    getPendingRequests(session.user.id),
    getSentRequests(session.user.id),
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              ← 戻る
            </Link>
            <h1 className="text-xl font-bold text-gray-800">フレンド</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{session.user.name} さん</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* 自分のID */}
        <section className="bg-blue-50 rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">
            あなたのユーザーID: <span className="font-mono font-semibold text-blue-800 select-all">{session.user.id}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">このIDをフレンドに共有してください</p>
        </section>

        {/* フレンド申請フォーム */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            フレンド申請
          </h2>
          <FriendRequestForm />
        </section>

        {/* 承認待ちの申請 */}
        {pendingRequests.length > 0 && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              承認待ちの申請 ({pendingRequests.length}件)
            </h2>
            <PendingRequests requests={pendingRequests} />
          </section>
        )}

        {/* 送信済みの申請 */}
        {sentRequests.length > 0 && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              送信済みの申請 ({sentRequests.length}件)
            </h2>
            <ul className="space-y-2">
              {sentRequests.map((request) => (
                <li
                  key={request.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {request.receiver.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {request.receiver.email}
                    </p>
                  </div>
                  <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    承認待ち
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* フレンド一覧 */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            フレンド一覧 ({friends.length}人)
          </h2>
          <FriendList friends={friends} />
        </section>
      </main>
    </div>
  );
}
